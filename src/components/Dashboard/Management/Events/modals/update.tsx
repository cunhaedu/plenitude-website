import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import axios from 'axios';

import { UpdateEventData, updateEventSchema } from '../schemas/updateEvent.schema';
import BaseModal from '../../BaseModal';

import { DateRange, DateRangePicker } from '@/components/@ui/date-range-picker';
import { Button } from '@/components/@ui/button';
import { Form } from '@/components/Form';
import { toast } from 'react-toastify';

type UploadEventCover = {
  file: File;
  name: string;
}

type EventData = {
  id: string;
  title: string;
  initialDate: Date;
  endDate: Date;
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
      rangeDate: {
        from: new Date(event.initialDate),
        to: new Date(event.endDate),
      },
    }
  }

  const updateEventForm = useForm<UpdateEventData>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: retrieveFormDefaultValue(),
  });

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting }
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
        initialDate: new Date(rangeDate.from),
        endDate: new Date(rangeDate.to),
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
      <FormProvider {...updateEventForm}>
        <form
          onSubmit={handleSubmit(updateEvent)}
          className="flex flex-col gap-4 w-full"
        >
          <Controller
            name="rangeDate"
            control={control}
            render={({ field }) => (
              <Form.Field>
                <Form.Label htmlFor="rangeDate">
                  Data de início e fim do evento
                </Form.Label>

                <DateRangePicker
                  placeholder='Selecione a data de início e fim do evento'
                  translations={{
                    cancel: "Cancelar",
                    apply: "Salvar",
                    range: "Intervalo entre as datas",
                  }}
                  className="w-full"
                  value={field.value as DateRange}
                  onChange={(e) => field.onChange(e)}
                  id="rangeDate"
                />
                <Form.ErrorMessage field="rangeDate" />
              </Form.Field>
            )}
          />

          <Form.Field inline>
            <Form.Input
              type="checkbox"
              name="isImageReplaced"
            />
            <Form.Label htmlFor="isImageReplaced">
              Desejo trocar a imagem
            </Form.Label>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cover">
              Imagem
            </Form.Label>

            <Form.Input
              name="cover"
              type="file"
              disabled={!watch("isImageReplaced")}
            />
            <p className="mt-1 text-sm text-gray-500">
              PNG, JPG, PNG ou WEBP (MAX 2MB | 400x400px).
            </p>
            <Form.ErrorMessage field="cover" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="title">
              Titulo
            </Form.Label>

            <Form.Input type="text" name="title" />
            <Form.ErrorMessage field="title" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="link">
              Link
            </Form.Label>

            <Form.Input type="text" name="link" />
            <Form.ErrorMessage field="link" />
          </Form.Field>

          <Form.ButtonGroup>
            <Button type="button" variant="secondary" color="zinc" onClick={closeModal} className="w-full sm:w-24">
              Cancelar
            </Button>

            <Button type="submit" color="red" isLoading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-24">
              Salvar
            </Button>
          </Form.ButtonGroup>
        </form>
      </FormProvider>
    </BaseModal>
  )
}
