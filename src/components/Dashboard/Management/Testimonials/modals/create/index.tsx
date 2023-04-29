import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';

import { TestimonialData, testimonialSchema } from '../../schemas/testimonial.schema';
import BaseModal from '../../../BaseModal';

import styles from './styles.module.scss';

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = createTestimonialForm;

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
      <div className={styles.modal_header}>
        <div>
          <form
            onSubmit={handleSubmit(createTestimonial)}
            className={styles.form}
          >
            <div className={styles.input_group}>
              <label htmlFor="name">
                Nome
              </label>
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
              <button type="submit" disabled={isSubmitting}>Salvar</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  )
}
