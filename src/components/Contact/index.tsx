import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import styles from './styles.module.scss';

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
    <section className={styles.contact}>
      <div>
        <h3>Contato</h3>

        <h4>
          Entre em contato com a gente! Queremos te ouvir,
          ajudar e tirar suas dúvidas.
        </h4>

        <a href={whatsappUrl}>
          <FaWhatsapp size={18} /> Enviar mensagem
        </a>
      </div>

      <aside>
        <div>
          <FaPhoneAlt/>
          <span>(11) 91129 - 6637</span>
        </div>

        <div>
          <MdEmail/>
          <span>igrejacomunidadeplenitude@gmail.com</span>
        </div>
      </aside>
    </section>
  )
}
