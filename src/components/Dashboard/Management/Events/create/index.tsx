import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Datepicker } from "@tremor/react";

import { EventData, eventSchema } from '../event.schema';
import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';

interface CreateEventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function CreateEventModal({
  isOpen,
  closeModal,
  revalidateData,
}: CreateEventModalProps) {
  const createEventForm = useForm<EventData>({
    resolver: zodResolver(eventSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = createEventForm;

  function createEvent(data: EventData) {
    const { endDate, initialDate, title, link } = data;

    // axios.post('/api/events/create', {
    //   name,
    //   description,
    // })
    // .then(async () => {
    //   reset();
    //   await revalidateData();
    //   toast.success('Testemunho criado com sucesso!');
    // })
    // .catch(() => toast.error('Falha ao criar testemunho'))
    // .finally(() => closeModal());
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
            <div className='flex'>
              <div className={styles.input_group}>
                <Datepicker placeholder='Data de Início' />
                {errors.initialDate && <span>{errors.initialDate.message}</span>}
              </div>

              <div className={styles.input_group}>
                <Datepicker placeholder='Data de fim' />
                {errors.endDate && <span>{errors.endDate.message}</span>}
              </div>
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
