import Image from 'next/image';
import Head from 'next/head';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import styles from './styles.module.scss';

export default function Peniel() {
  return (
    <div>
      <Head>
        <title>Peniel | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Saiba um pouco mais sobre o peniel, um encontro imersivo face a face com Deus."
          key="desc"
        />

        <meta property="og:title" content="Peniel | Comunidade Plenitude" />
        <meta
          property="og:description"
          content="Saiba um pouco mais sobre a nossa história, um encontro imersivo face a face com Deus."
        />
        <meta
          property="og:image"
          content="/assets/pages/peniel/background.webp"
        />
      </Head>

      <Header currentPage='peniel' />

      <main>
        <section className={styles.peniel_header}>
          <div>
            <h1>Peniel Encontro Face a Face com Deus</h1>
          </div>
        </section>

        <div className={styles.peniel_body}>
          <section>
            <Image
              src="/assets/pages/peniel/peniel.png"
              alt="Peniel Encontro Face a Face com Deus"
              width={400}
              height={400}
            />

            <div className={styles.peniel_body__about}>
              <h3>O que é o Peniel ?</h3>

              <p>
                O Peniel é um encontro face a face com Deus, ele foi inspirado no
                livro de Gênesis (32: 23 - 24) e se refere ao encontro que Jacó
                teve com o Senhor.
              </p>

              <p>
                Em Peniel pessoas são confrontadas, curadas e transformadas de
                dentro para fora, entendendo quem verdadeiramente são em Deus e o
                seu propósito no mundo.
              </p>

              <p>
                O encontro acontece em um complexo da Comunidade Plenitude e tem a
                duração de três dias, incluindo café da manhã, almoço e janta.
                Convidamos você a se juntar a nós!
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
