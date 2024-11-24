import { ExclamationIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

import BaseModal from '../../BaseModal';

import { Form } from '@/components/Form';
import { Button } from '@/components/@ui/button';

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
      <div className="w-full">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="flex flex-shrink-0 w-12 h-12 mx-auto items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon aria-hidden width={24} height={24} className="text-red-600" />
          </div>

          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
            Remover Evento
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Você tem certeza que deseja remover o evento {' '}
              <strong>{event.title}</strong>
            </p>
          </div>
        </div>

        <Form.ButtonGroup>
          <Button type="button" variant="secondary" color="zinc" onClick={closeModal} className="w-full sm:w-24">
            Cancelar
          </Button>

          <Button type="button" color="red" isLoading={isLoading} disabled={isLoading} onClick={deleteEvent} className="w-full sm:w-24">
            Remover
          </Button>
        </Form.ButtonGroup>
      </div>
    </BaseModal>
  )
}
