import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';

import { TestimonialData, testimonialSchema } from '../event.schema';
import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = updateTestimonialForm;

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
      <div className={styles.modal_header}>
        <div>
        <form
          onSubmit={handleSubmit(updateTestimonial)}
          className={styles.form}
        >
          <div className={styles.input_group}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              maxLength={45}
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className={styles.input_group}>
            <label htmlFor="description">Testemunho</label>
            <textarea
              rows={5}
              maxLength={560}
              {...register("description")}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className={styles.modal_footer}>
            <button type="submit" disabled={isSubmitting}>Atualizar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
        </div>
      </div>
    </BaseModal>
  )
}
