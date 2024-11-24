import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import { CreateEventData, createEventSchema } from '../schemas/createEvent.schema';
import BaseModal from '../../BaseModal';

import { Form } from '@/components/Form';
import { Button } from '@/components/@ui/button';
import { DateRange, DateRangePicker } from '@/components/@ui/date-range-picker';

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
      link: '',
    }
  });

  const { handleSubmit, reset, control, formState: { isSubmitting } } = createEventForm;

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
        initialDate: new Date(rangeDate.from),
        endDate: new Date(rangeDate.to),
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
      <FormProvider {...createEventForm}>
        <form
          onSubmit={handleSubmit(createEvent)}
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
                  fromDate={new Date()}
                />
                <Form.ErrorMessage field="rangeDate" />
              </Form.Field>
            )}
          />

          <Form.Field>
            <Form.Label htmlFor="cover">
              Imagem
            </Form.Label>

            <Form.Input type="file" name="cover" />
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
