import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

import { FormFooter } from '@/components/Dashboard/FormFooter';
import { UpdateEventData, updateEventSchema } from '../../schemas/updateEvent.schema';
import BaseModal from '../../../BaseModal';

import styles from './styles.module.scss';
import { useEffect } from 'react';

type UploadEventCover = {
  file: File;
  name: string;
}

type EventData = {
  id: string;
  title: string;
  initialDate: string;
  endDate: string;
  cover: string;
  link: string;
}

interface UpdateEventModalProps {
  event: EventData;
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function UpdateEventModal({
  isOpen,
  closeModal,
  revalidateData,
  event,
}: UpdateEventModalProps) {
  function retrieveFormDefaultValue() {
    return {
      link: event.link,
      title: event.title,
      isImageReplaced: false,
      rangeDate: [
        new Date(event.initialDate),
        new Date(event.endDate),
        null
      ],
    }
  }

  const updateEventForm = useForm<UpdateEventData>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: retrieveFormDefaultValue(),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = updateEventForm;

  useEffect(() => {
    reset(retrieveFormDefaultValue());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  async function uploadEventCover({
    file,
    name
  }: UploadEventCover): Promise<{ url: string }> {
    const { data } = await axios.post<{ url: string, presignedUrl: string }>(
      '/api/ibm-cos/upload',
      {
        imageName: name,
        imageType: file.type,
        prefix: 'events',
      }
    );

    await axios.put(data.presignedUrl, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      }
    });

    return { url: data.url };
  }

  async function updateEvent(data: UpdateEventData) {
    try {
      const { title, link, rangeDate, cover, isImageReplaced } = data;
      const titleSlug =  title.toLowerCase().split(' ').join('_');

      let url = event.cover;

      if(isImageReplaced) {
        const response = await uploadEventCover({
          file: cover,
          name: titleSlug,
        });

        url = response.url;
      }

      await axios.put('/api/events/update', {
        id: event.id,
        link,
        title,
        cover: url,
        initialDate: new Date(rangeDate[0]),
        endDate: new Date(rangeDate[1]),
      });

      if(isImageReplaced && event.title !== title) {
        const key = event.cover.split('/').pop();

        await axios.post('/api/ibm-cos/remove', {
          key,
        });
      }

      reset();
      await revalidateData();
      toast.success('Evento atualizado com sucesso!');
    } catch (err) {
      toast.error('Falha ao atualizar o evento');
    } finally {
      closeModal();
    }
  };

  return (
    <BaseModal
      closeModal={closeModal}
      isOpen={isOpen}
    >
      <div className={styles.modal_header}>
        <div>
          <form
            onSubmit={handleSubmit(updateEvent)}
            className={styles.form}
          >
            <Controller
              name="rangeDate"
              control={control}
              render={({ field }) => (
                <div className={styles.input_group}>
                  <label>Data de início e fim do evento</label>
                  <DateRangePicker
                    placeholder='Selecione a data de início e fim'
                    className="w-full"
                    enableDropdown={false}
                    locale={ptBR}
                    value={field.value as DateRangePickerValue}
                    onValueChange={(e) => field.onChange(e)}
                  />

                  {errors.rangeDate && <span>{errors.rangeDate.message}</span>}
                </div>
              )}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="checked-checkbox"
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                {...register('isImageReplaced')}
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Desejo trocar a imagem
              </label>
            </div>

            <div className={styles.input_group}>
              <label>Imagem</label>
              <input
                type="file"
                accept="image/*"
                disabled={!watch("isImageReplaced")}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none disabled:opacity-50"
                {...register('cover')}
              />
              <p className="mt-1 text-sm text-gray-500">
                PNG, JPG, PNG ou WEBP (MAX 2MB | 400x400px).
              </p>
              {errors.cover && <span>{errors.cover.message}</span>}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="title">Titulo</label>
              <input
                type="text"
                maxLength={45}
                {...register("title")}
              />
              {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="description">Link</label>
              <input
                type="text"
                {...register("link")}
              />
              {errors.link && <span>{errors.link.message}</span>}
            </div>

            <FormFooter
              closeModal={closeModal}
              isSaveButtonLoading={isSubmitting}
              mainButtonAction='update'
            />
          </form>
        </div>
      </div>
    </BaseModal>
  )
}
