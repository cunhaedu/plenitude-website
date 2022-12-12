import { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export function Contact() {
  const [mounted, setMounted] = useState(false);
  let whatsappUrl = 'https://api.whatsapp.com/send?phone=+5511911296637';

  useEffect(() => {
    setMounted(true)
  }, []);

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      whatsappUrl = 'https://web.whatsapp.com/send?phone=+5511911296637';
    }
  }

  return (
    <section className='py-20 px-10 gap-10 md:gap-0 bg-gray-100 flex flex-col md:justify-evenly md:flex-row align-middle justify-center'>
      <div className='flex flex-col gap-10'>
        <h3 className='text-center md:text-left font-bold text-2xl text-gray-800'>Contato</h3>

        <h4 className='md:w-1/2 text-gray-600 text-center md:text-left'>
          Entre em contato com a gente! Queremos te ouvir,
          ajudar e tirar suas dúvidas.
        </h4>

        <a
          className='md:w-1/3 text-center bg-gray-800 text-white font-medium rounded-md px-3 py-2'
          href={whatsappUrl}
        >
          Enviar mensagem
        </a>
      </div>

      <div className='flex flex-col md:justify-end'>
        <div className='flex align-middle gap-2 self-center md:self-end'>
          <FaPhoneAlt className='self-center text-gray-500'/>
          <span className='text-gray-500 font-medium'>(11) 91129 - 6637</span>
        </div>

        <div className='flex align-middle gap-2 self-center md:self-end'>
          <MdEmail className='self-center text-gray-500'/>
          <span className='text-gray-500 font-medium'>
            igrejacomunidadeplenitude@gmail.com
          </span>
        </div>
      </div>
    </section>
  )
}
