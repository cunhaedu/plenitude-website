import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';

import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';
import { useState } from 'react';

type TestimonialData = {
  name: string;
  description: string;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const onSubmit = async (data: TestimonialData) => {
    setIsLoading(true);
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
    .catch((err) => {
      console.log(err);
      toast.error('Falha ao criar testemunho');
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
            <button type="submit" disabled={isLoading}>Salvar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
        </div>
      </div>
    </BaseModal>
  )
}
