import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';

import { TestimonialData, testimonialSchema } from '../schemas/testimonial.schema';
import BaseModal from '../../BaseModal';

import { Form } from '@/components/Form';
import { Button } from '@tremor/react';

type UpdateTestimonialData = TestimonialData & {
  id: string;
}

interface UpdateTestimonialModalProps {
  testimonial: UpdateTestimonialData;
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function UpdateTestimonialModal({
  isOpen,
  closeModal,
  revalidateData,
  testimonial,
}: UpdateTestimonialModalProps) {
  const updateTestimonialForm = useForm<TestimonialData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial.name,
      description: testimonial.description,
    }
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = updateTestimonialForm;

  useEffect(() => {
    reset(testimonial);
  }, [testimonial, reset]);

  function updateTestimonial(data: TestimonialData) {
    const { name, description } = data;

    axios.put('/api/testimonials/update', {
      id: testimonial.id,
      name,
      description,
    })
    .then(async () => {
      reset();
      await revalidateData();
      toast.success('Testemunho atualizado com sucesso!');
    })
    .catch(() => toast.error('Falha ao atualizar testemunho'))
    .finally(() => closeModal());
  };

  return (
    <BaseModal
      closeModal={closeModal}
      isOpen={isOpen}
    >
      <FormProvider {...updateTestimonialForm}>
        <form
          onSubmit={handleSubmit(updateTestimonial)}
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
              Atualizar
            </Button>
          </Form.ButtonGroup>
        </form>
      </FormProvider>
    </BaseModal>
  )
}
