import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__copyright}>
        <span>
          © {new Date().getFullYear()} Comunidade Plenitude. Todos os direitos reservados.
        </span>
      </section>

      <section className={styles.footer__links}>
        <div>
          <a
            href="https://www.instagram.com/ce.plenitude/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram className='hover:text-instagram' />
          </a>
        </div>

        <div>
          <a
            href="https://www.youtube.com/user/ComunidadePlenitude"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className='hover:text-youtube' />
          </a>
        </div>

        <div>
          <a
            href="https://pt-br.facebook.com/pg/comunidadeevangelicaplenitude"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className='hover:text-facebook' />
          </a>
        </div>

        <div>
          <a
            href="https://www.tiktok.com/@comunidadeplenitude"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className='hover:text-tiktok' />
          </a>
        </div>
      </section>
    </footer>
  )
}
