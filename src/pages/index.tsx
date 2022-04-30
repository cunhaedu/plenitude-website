import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { LibraryIcon } from '@heroicons/react/solid';
import { FaMapMarkerAlt } from 'react-icons/fa';

import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { LeaderShipRow } from '../components/LeaderShipRow';
import { Testimonials } from '../components/Testimonials';
import { Contribution } from '../components/Contribution';
import { Contact } from '../components/Contact';

export default function Home () {
  return (
    <div>
      <Head>
        <title>Início | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='home' />

      <main>
        <section className="bg-home bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5 tracking-wide'>Comunidade Plenitude</h1>
            <h2 className='font-semibold text-xl'>Lugar de novos começos</h2>
          </div>
        </section>

        <section className='h-96 flex flex-col align-middle justify-center px-5 md:px-2' >
          <h3 className='text-center font-bold text-gray-500 text-xl lg:px-80 lg:text-2xl'>
            A Comunidade Plenitude é uma igreja evangélica com o
            <span className='text-gray-900'> propósito </span>
            de conduzir pessoas a um relacionamento intenso com Deus.
          </h3>
        </section>

        <section className='bg-blue-100/30 flex flex-col align-middle justify-center py-10' >
          <LibraryIcon className='h-12 w-full text-blue-600' />
          <h3 className='font-bold text-3xl p-5 text-gray-800 text-center'>
            Conheça nossa <span className='text-blue-600'>liderança</span>
          </h3>

          <LeaderShipRow />

          <Link href='/ministries'>
            <a className='underline self-center font-semibold text-blue-600 text-center hover:text-blue-900'>
              Ver tudo
            </a>
          </Link>
        </section>

        {/* Localization */}
        <section className='py-20 px-10 flex justify-center md:justify-evenly'>
          <div className='flex flex-col justify-center align-middle'>
            <h2 className='font-bold text-3xl pb-3 flex self-center md:self-start'>
              <FaMapMarkerAlt className='mt-1 pr-2' /> Localização
            </h2>
            <p className='pb-10 text-gray-500 font-medium self-center text-center md:self-start md:text-left'>
              Confira nossa igreja mais próxima de você
            </p>

            <Link href='places'>
              <a className='w-32 bg-gray-500 text-white text-center hover:bg-gray-600 py-3 px-5 rounded-md self-center md:self-start'>Conferir</a>
            </Link>
          </div>

          <div className='hidden md:flex align-middle justify-center w-96'>
            <Image
              src='/assets/illustrations/map.svg'
              alt='Igrejas em São Paulo'
              width={400}
              height={400}
            />
          </div>
        </section>

        <Testimonials />

        <Contribution />

        <Contact />

      </main>

      <Footer />

    </div>
  )
}
