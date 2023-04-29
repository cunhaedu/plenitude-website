import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

import { FormFooter } from '@/components/Dashboard/FormFooter';
import { CreateEventData, createEventSchema } from '../../schemas/createEvent.schema';
import BaseModal from '../../../BaseModal';

import styles from './styles.module.scss';

interface CreateEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

type UploadEventCover = {
  file: File;
  name: string;
}

export default function CreateEventModal({
  isOpen,
  closeModal,
  revalidateData,
}: CreateEventModalProps) {
  const createEventForm = useForm<CreateEventData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      link: null,
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = createEventForm;

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

  async function createEvent(data: CreateEventData) {
    try {
      const { title, link, rangeDate, cover } = data;
      const titleSlug =  title.toLowerCase().split(' ').join('_');

      const { url } = await uploadEventCover({
        file: cover,
        name: titleSlug,
      });

      await axios.post('/api/events/create', {
        link,
        title,
        cover: url,
        initialDate: new Date(rangeDate[0]),
        endDate: new Date(rangeDate[1]),
      });

      reset();
      await revalidateData();
      toast.success('Evento cadastrado com sucesso!');
    } catch (err) {
      toast.error('Falha ao cadastrar evento');
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
            onSubmit={handleSubmit(createEvent)}
            className={styles.form}
          >
            <Controller
              name="rangeDate"
              control={control}
              render={({ field }) => (
                <div className={styles.input_group}>
                  <label>Data de início e fim do evento</label>
                  <DateRangePicker
                    placeholder='Selecione a data de início e fim do evento'
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

            <div className={styles.input_group}>
              <label>Imagem</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
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
              mainButtonAction='save'
            />
          </form>
        </div>
      </div>
    </BaseModal>
  )
}
