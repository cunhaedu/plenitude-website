import Image from 'next/image';

import styles from './styles.module.scss';

export function EventsEmptyState() {
  return (
    <section className={styles.container}>
      <h2>
        <span>Brevemente </span>
        teremos novidades esperando por você!
      </h2>

      <div>
        <Image
          src="/assets/illustrations/empty-events.svg"
          alt='Nenhum evento encontrado'
          width={400}
          height={400}
        />
      </div>
    </section>
  )
}
