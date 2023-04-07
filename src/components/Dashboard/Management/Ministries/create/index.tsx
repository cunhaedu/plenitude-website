import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';

import BaseModal from '../../BaseModal';

import styles from './styles.module.scss';
import { useState } from 'react';

type MinistryData = {
  name: string;
}

interface CreateMinistryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  revalidateData: () => Promise<void>;
}

export default function CreateMinistryModal({
  isOpen,
  closeModal,
  revalidateData,
}: CreateMinistryModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
    }
  });

  const [selectedFile, setSelectedFile] = useState(new Blob());

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (data: MinistryData) => {
    setIsLoading(true);
    // const { name } = data;

    const reader = new FileReader();

    reader.onload = (event: any) => {
      axios.post('/api/ibm-cos/upload', {
        file: event.target.result,
        type: selectedFile.type,
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
    };

    reader.readAsBinaryString(selectedFile);

    // axios.post('/api/ibm-cos/upload')
    // .catch(error => {
    //   console.log(error);
    // })
    // .finally(() => {
    //   setIsLoading(false);
    //   closeModal();
    // });

    // .then(async () => {
    //   reset();
    //   await revalidateData();
    //   toast.success('Testemunho criado com sucesso!');
    // })
    // .catch((err) => {
    //   console.log(err);
    //   toast.error('Falha ao criar testemunho');
    // })
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
          <input type="file" name="file" onChange={changeHandler}/>
            {/* <label htmlFor="description">
              Testemunho
            </label>
            <textarea
              rows={5}
              maxLength={255}
              {...register("description", { required: true, maxLength: 255 })}
            />
            {errors.description && <span>A descrição é obrigatória</span>} */}
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
