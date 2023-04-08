import { Button } from '@tremor/react';

type FormFooterProps = {
  closeModal: () => void;
  isSaveButtonLoading: boolean;
}

export function FormFooter({
  closeModal,
  isSaveButtonLoading
}: FormFooterProps) {
  return (
    <div className="px-6 py-3 md:px-0 flex flex-row-reverse gap-3">
      <Button
        loading={isSaveButtonLoading}
        type="submit"
        color="red"
        size="md"
        className="w-24"
      >
        Salvar
      </Button>

      <Button
        variant="secondary"
        color="slate"
        size="md"
        type="button"
        className="w-24"
        onClick={closeModal}
      >
        Cancelar
      </Button>
    </div>
  )
}
