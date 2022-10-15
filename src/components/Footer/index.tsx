import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='p-2 lg:flex items-center justify-between lg:p-8'>
      <section className='flex justify-center align-middle items-center pt-10 lg:pt-0'>
        <span className='block font-semibold text-center text-gray-500'>© {new Date().getFullYear()} Comunidade Plenitude. Todos os direitos reservados.</span>
      </section>

      <section className='flex flex-nowrap justify-center align-middle gap-8 mt-4 lg:mt-0'>
        <div className='flex justify-center align-middle'>
          <a
            href="https://www.instagram.com/ce.plenitude/"
            target="_blank"
            rel="noopener noreferrer"
            className='no-underline h-6 w-6'
          >
            <AiFillInstagram className='h-6 w-6 text-gray-500 hover:text-instagram' />
          </a>
        </div>

        <div className='flex justify-center align-middle'>
          <a
            href="https://www.youtube.com/user/ComunidadePlenitude"
            target="_blank"
            rel="noopener noreferrer"
            className='no-underline h-6 w-6'
          >
            <FaYoutube className='h-6 w-6 text-gray-500 hover:text-youtube' />
          </a>
        </div>

        <div className='flex justify-center align-middle'>
          <a
            href="https://pt-br.facebook.com/pg/comunidadeevangelicaplenitude"
            target="_blank"
            rel="noopener noreferrer"
            className='no-underline h-6 w-6'
          >
            <FaFacebook className='h-6 w-6 text-gray-500 hover:text-facebook' />
          </a>
        </div>

        <div className='flex justify-center align-middle'>
          <a
            href="https://www.tiktok.com/@comunidadeplenitude"
            target="_blank"
            rel="noopener noreferrer"
            className='no-underline h-6 w-6'
          >
            <FaTiktok className='h-6 w-6 text-gray-500 hover:text-tiktok' />
          </a>
        </div>
      </section>
    </footer>
  )
}
