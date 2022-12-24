import Image from 'next/future/image';
import Head from 'next/head';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export default function Events() {
  return (
    <div>
      <Head>
        <title>Eventos | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Fique por dentro de todos os eventos que estão acontecendo."
          key="desc"
        />
      </Head>

      <Header currentPage='events' />

      <main className='bg-violet-100/30'>
        <section className="bg-events bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-4xl md:text-5xl p-5 tracking-wide'>
              Eventos da Comunidade Plenitude
            </h1>
          </div>
        </section>

        <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold text-center tracking-tight text-gray-900">
            <span className='text-violet-500'>Brevemente </span>
            teremos novidades esperando por você!
          </h2>

          <div className='flex items-center justify-center mt-20'>
            <Image
              src="/assets/illustrations/empty-events.svg"
              alt='Nenhum evento encontrado'
              width={400}
              height={400}
              className="h-80 w-52"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
