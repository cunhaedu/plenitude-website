import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { LibraryIcon } from '@heroicons/react/solid';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Testimonials } from '../components/Testimonials';
import { Contribution } from '../components/Contribution';
import { Contact } from '../components/Contact';
import { ImageSlider } from '../components/ImageSlider';
import { leaderShips } from '../data/leadership';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Início | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='home' />

      <main>
        <section className="relative flex items-center justify-center h-[calc(100vh-64px)] overflow-hidden">
          <div className="relative z-20 bg-[rgba(0,0,0,0.6)] w-screen h-[calc(100vh-64px)] flex flex-col justify-center items-center">
            <h1 className='font-bold text-5xl p-5 tracking-wide text-white text-center'>
              Comunidade Plenitude
            </h1>
            <h2 className='font-semibold text-xl text-white text-center'>
              Lugar de novos começos
            </h2>
          </div>

          <video
            autoPlay
            loop
            muted
            className="absolute z-10 min-w-full min-h-full max-w-none"
          >
            <source
              src="https://drive.google.com/uc?export=download&id=1wMrOP5FuUrZ_FJ29boFg4j4PnU2Yx5d6"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className='h-96 flex flex-col align-middle justify-center px-5 md:px-2' >
          <h3 className='text-center font-bold text-gray-500 text-xl lg:px-80 lg:text-2xl'>
            A Comunidade Plenitude é uma igreja evangélica com o
            <span className='text-gray-900'> propósito </span>
            de conduzir pessoas a um relacionamento intenso com Deus.
          </h3>
        </section>

        <section className='bg-blue-100/30 md:flex flex-col align-middle justify-center'>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <LibraryIcon className='h-12 w-full text-blue-600' />
            <h3 className='font-bold text-3xl p-5 text-gray-800 text-center'>
              Conheça nossa <span className='text-blue-600'>liderança</span>
            </h3>

            <ImageSlider
              data={leaderShips.map(leader => ({
                identifier: leader.slug,
                title: leader.name,
                imageURL:leader.image,
                shortDescription: leader.description,
              }))}
            />

            <Link href='/ministries'>
            <a className='underline w-full block font-semibold text-blue-600 text-center hover:text-blue-900'>
              Ver tudo
            </a>
          </Link>
          </div>
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

            <Link href='/churches'>
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
