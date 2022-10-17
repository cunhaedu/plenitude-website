import { FaClipboard as ClipboardIcon } from 'react-icons/fa';
import Image from 'next/future/image';
import { Slide, toast, ToastContainer } from 'react-toastify';

export function Contribution() {

  function copyTextToClipboard(text: string): void {
    navigator.clipboard.writeText(text);

    toast.success('Texto copiado para a área de transferência', {
      position: 'bottom-right',
      transition: Slide,
    });
  }

  return (
    <section className='p-10'>
      <h3 className='text-center text-2xl font-bold'>
        Essa obra <span className='text-red-600'>não pode</span> parar
      </h3>

      <h4 className='text-center font-medium pt-4'>Contribua com o seu melhor</h4>

      <div className='flex flex-col md:flex-row md:justify-evenly align-middle md:pt-5'>
        <div className='flex flex-col align-middle justify-evenly'>
          <Image
            src="/assets/bank-accounts/bradesco-logo.svg"
            alt='Bradesco'
            width={200}
            height={200}
            className="self-center"
          />

          <p className='text-center font-medium text-gray-700'>
            Agência: 1614
          </p>

          <div className='flex items-center justify-center gap-3'>
            <p className='text-center font-medium text-gray-700'>
              Conta corrente: 95016-5
            </p>
            <ClipboardIcon
              size={18}
              onClick={() => copyTextToClipboard('95016-5')}
              className='cursor-pointer text-gray-600 hover:text-emerald-600'
            />
          </div>
        </div>

        <div className='flex flex-col align-middle justify-evenly'>
          <Image
            src="/assets/bank-accounts/pix-logo.svg"
            alt='Pix'
            width={200}
            height={200}
            className="self-center"
          />

          <div className='flex items-center justify-center gap-3'>
            <p className='text-center font-medium text-gray-700'>
              14.073.517/0001-15
            </p>
            <ClipboardIcon
              size={18}
              onClick={() => copyTextToClipboard('14.073.517/0001-15')}
              className='cursor-pointer text-gray-600 hover:text-emerald-600'
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  )
}
