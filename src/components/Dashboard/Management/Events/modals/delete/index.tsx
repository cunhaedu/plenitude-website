import { ExclamationIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

import BaseModal from '../../../BaseModal';

import styles from './styles.module.scss';

type EventData = {
  id: string;
  title: string;
  cover: string;
}

interface DeleteEventModalProps {
  event: EventData;
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function DeleteEventModal({
  isOpen,
  closeModal,
  event,
  revalidateData,
}: DeleteEventModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteEvent() {
    setIsLoading(true);

    try {
      await axios.delete('/api/events/delete', {
        data: {
          id: event.id,
        }
      });

      const key = event.cover.split('/').pop();

      await axios.post('/api/ibm-cos/remove', {
        key,
      });

      await revalidateData();
      toast.success('Evento removido com sucesso!');

    } catch (err: any) {
      console.log(err);
      toast.error('Falha ao remover evento');
    }
    finally {
      setIsLoading(false);
      closeModal();
    }
  }

  return (
    <BaseModal
      closeModal={closeModal}
      isOpen={isOpen}
    >
      <div className={styles.delete_modal_header}>
        <div>
          <div className={styles.delete_modal_header__icon_container}>
            <ExclamationIcon aria-hidden width={24} height={24} />
          </div>
          <div className={styles.delete_modal_header__title_container}>
            <h3>Remover Testemunho</h3>
            <p>
              Você tem certeza que deseja remover o evento {' '}
              <strong>{event.title}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.delete_modal_footer}>
        <button
          type="button"
          disabled={isLoading}
          onClick={deleteEvent}
        >
          Remover
        </button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </div>
    </BaseModal>
  )
}
