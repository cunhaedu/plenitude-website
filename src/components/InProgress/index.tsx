import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

export default function InProgress() {
  return (
    <main className={styles.in_progress_container}>
      <Image
        src='/assets/illustrations/building.svg'
        alt='building'
        width={250}
        height={250}
      />

      <h2>
        Sentimos muito, parece que esta parte do site está em construção, <br/>
        mas não se preocupe, logo logo ela será disponibilizada por aqui
      </h2>

      <Link href="/" passHref>
        <a>Voltar ao início</a>
      </Link>
    </main>
  )
}
