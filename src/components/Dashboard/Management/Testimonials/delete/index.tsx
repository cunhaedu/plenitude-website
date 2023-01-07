import { ExclamationIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify';
import axios from 'axios';

import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';

type TestimonialData = {
  id: string;
  name: string;
}

interface DeleteTestimonialModalProps {
  testimonial: TestimonialData;
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function DeleteTestimonialModal({
  isOpen,
  closeModal,
  testimonial,
  revalidateData,
}: DeleteTestimonialModalProps) {
  async function deleteTestimonial() {
    axios.delete('/api/testimonials/delete', {
      data: {
        id: testimonial.id,
      }
    })
    .then(async () => {
      await revalidateData();
      toast.success('Testemunho removido com sucesso!');
    })
    .catch((err) => {
      console.log(err);
      toast.error('Falha ao remover testemunho');
    })
    .finally(() => {
      closeModal();
    });
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
              Você tem certeza que deseja remover o testemunho do(a)
              {testimonial.name}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.delete_modal_footer}>
        <button type="button" onClick={deleteTestimonial}>Remover</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </div>
    </BaseModal>
  )
}
