import Image from 'next/future/image';

import styles from './styles.module.scss';

export function Contribution() {
  return (
    <section className={styles.contribution}>
      <h3>
        Essa obra <span>não pode</span> parar
      </h3>

      <h4>Contribua com o seu melhor</h4>

      <div className={styles.contribution_info_container}>
        <div>
          <Image
            src="/assets/bank-accounts/bradesco-logo.svg"
            alt='Bradesco'
            width={200}
            height={200}
          />

          <p>Agência: 1614</p>

          <div>
            <p>Conta corrente: 95016-5</p>
          </div>
        </div>

        <div>
          <Image
            src="/assets/bank-accounts/pix-logo.svg"
            alt='Pix'
            width={200}
            height={200}
          />

          <div>
            <p>14.073.517/0001-15</p>
          </div>
        </div>
      </div>
    </section>
  )
}
