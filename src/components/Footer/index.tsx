import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='p-10'>
      <section className='flex flex-nowrap justify-end align-middle'>
        <a
          href="https://www.instagram.com/ce.plenitude/"
          target="_blank"
          rel="noopener noreferrer"
          className='no-underline pr-5'
        >
          <AiFillInstagram className='w-10 h-10 text-gray-500' />
        </a>

        <a
          href="https://www.youtube.com/user/ComunidadePlenitude"
          target="_blank"
          rel="noopener noreferrer"
          className='no-underline pr-5'
        >
          <FaYoutube className='w-10 h-10 text-gray-500' />
        </a>

        <a
          href="https://www.facebook.com/comunidadeevangelicaplenitude/"
          target="_blank"
          rel="noopener noreferrer"
          className='no-underline'
        >
          <FaFacebook className='w-10 h-10 text-gray-500' />
        </a>
      </section>
    </footer>
  )
}
