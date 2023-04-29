import { Button } from '@tremor/react';

type FormFooterProps = {
  closeModal: () => void;
  isSaveButtonLoading: boolean;
  mainButtonAction: 'save' | 'update' | 'remove';
}

export function FormFooter({
  closeModal,
  isSaveButtonLoading,
  mainButtonAction,
}: FormFooterProps) {
  function retrieveMainButtonText(): string {
    const texts = {
      'save': 'Salvar',
      'update': 'Atualizar',
      'remove': 'Deletar',
    }

    return texts[mainButtonAction];
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <div className="px-6 py-3 md:px-0 flex flex-row-reverse gap-3">
      <Button
        loading={isSaveButtonLoading}
        type="submit"
        color="red"
        size="md"
        className="w-24"
      >
        {retrieveMainButtonText()}
      </Button>

      <Button
        variant="secondary"
        color="slate"
        size="md"
        type="button"
        className="w-24"
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </div>
  )
}
