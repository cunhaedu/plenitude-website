import Image from 'next/future/image';
import Head from 'next/head';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

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
        <section className="bg-peniel bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5 tracking-wide'>
              Peniel Encontro Face a Face com Deus
            </h1>
          </div>
        </section>

        <div className='px-5 md:px-10 lg:px-40 py-10'>
          <section className='flex items-center md:justify-between gap-5'>
            <Image
              src="/assets/pages/peniel/peniel.png"
              alt="Peniel Encontro Face a Face com Deus"
              width={400}
              height={400}
              className="w-80 h-80 hidden md:block"
            />

            <div className='font-medium text-gray-700 text-lg tracking-wide text-justify hyphens-auto'>
              <h3 className='text-4xl text-center md:text-left font-bold text-gray-500 pb-10 md:pb-4'>
                O que é o Peniel ?
              </h3>

              <p className='pb-2'>
                O Peniel é um encontro face a face com Deus, ele foi inspirado no
                livro de Gênesis (32: 23 - 24) e se refere ao encontro que Jacó
                teve com o Senhor.
              </p>

              <p className='pb-2'>
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
