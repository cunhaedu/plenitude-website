import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';

import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

type TestimonialData = {
  id: string;
  name: string;
  description: string;
}

interface UpdateTestimonialModalProps {
  testimonial: TestimonialData;
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
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: testimonial.name,
      description: testimonial.description,
    }
  });

  useEffect(() => {
    reset(testimonial);
  }, [testimonial, reset]);

  const onSubmit = async (data: Omit<TestimonialData, 'id'>) => {
    setIsLoading(true);
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
    .catch((err) => {
      console.log(err);
      toast.error('Falha ao atualizar testemunho');
    })
    .finally(() => {
      setIsLoading(false);
      closeModal();
    });
  };

  return (
    <BaseModal
      closeModal={closeModal}
      isOpen={isOpen}
    >
      <div className={styles.modal_header}>
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.input_group}>
            <label htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              maxLength={45}
              {...register("name", { required: true, maxLength: 45 })}
            />
            {errors.name && <span>O nome é obrigatório</span>}
          </div>

          <div className={styles.input_group}>
            <label htmlFor="description">
              Testemunho
            </label>
            <textarea
              rows={5}
              maxLength={255}
              {...register("description", { required: true, maxLength: 255 })}
            />
            {errors.description && <span>A descrição é obrigatória</span>}
          </div>

          <div className={styles.modal_footer}>
            <button type="submit" disabled={isLoading}>Atualizar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
        </div>
      </div>
    </BaseModal>
  )
}
