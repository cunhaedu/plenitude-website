import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';

import { TestimonialData, testimonialSchema } from '../schemas/testimonial.schema';
import BaseModal from '../../BaseModal';

import { Form } from '@/components/Form';
import { Button } from '@tremor/react';

interface CreateTestimonialModalProps {
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function CreateTestimonialModal({
  isOpen,
  closeModal,
  revalidateData,
}: CreateTestimonialModalProps) {
  const createTestimonialForm = useForm<TestimonialData>({
    resolver: zodResolver(testimonialSchema),
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = createTestimonialForm;

  function createTestimonial(data: TestimonialData) {
    const { name, description } = data;

    axios.post('/api/testimonials/create', {
      name,
      description,
    })
    .then(async () => {
      reset();
      await revalidateData();
      toast.success('Testemunho criado com sucesso!');
    })
    .catch(() => toast.error('Falha ao criar testemunho'))
    .finally(() => closeModal());
  };

  return (
    <BaseModal
      closeModal={closeModal}
      isOpen={isOpen}
    >
      <FormProvider {...createTestimonialForm}>
        <form
          onSubmit={handleSubmit(createTestimonial)}
          className="flex flex-col gap-4 w-full"
        >
          <Form.Field>
            <Form.Label htmlFor="name">
              Nome
            </Form.Label>

            <Form.Input type="text" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="description">
              Testemunho
            </Form.Label>

            <Form.TextArea name="description" />
            <Form.ErrorMessage field="description" />
          </Form.Field>

          <Form.ButtonGroup>
            <Button type="button" variant="secondary" color="zinc" onClick={closeModal} className="w-full sm:w-24">
              Cancelar
            </Button>

            <Button type="submit" color="red" loading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-24">
              Salvar
            </Button>
          </Form.ButtonGroup>
        </form>
      </FormProvider>
    </BaseModal>
  )
}
