import { LibraryIcon } from '@heroicons/react/solid';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import { Testimonials } from '../components/Testimonials';
import { Contribution } from '../components/Contribution';
import { ImageSlider } from '../components/ImageSlider';
import { Contact } from '../components/Contact';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { client } from '../lib/apollo';

type GetTestimonialsResponse = {
  testimonials: Array<{
    name: string;
    description: string;
  }>;
}

type GetLeadershipsResponse = {
  leaderships: Array<{
    slug: string;
    name: string;
    avatar: string;
    role: string;
  }>;
}

interface HomeProps extends GetTestimonialsResponse, GetLeadershipsResponse {}

const GET_TESTIMONIALS_QUERY = gql`
  query Testimonials {
    testimonials {
      name
      description
    }
  }
`

const GET_LEADERSHIPS_QUERY = gql`
  query Leadership  {
    leaderships (first: 5) {
      slug
      name
      avatar
      role
    }
  }
`

export default function Home({ testimonials, leaderships }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Início | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Bem Vindo a Comunidade Plenitude"
          key="desc"
        />

        <meta property="og:title" content="Inicio | Comunidade plenitude" />
        <meta
          property="og:description"
          content="Bem Vindo a Comunidade Plenitude"
        />
        <meta
          property="og:image"
          content="/assets/logo/full.webp"
        />
      </Head>

      <Header currentPage='home' />

      <main>
        <section className="bg-home bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white gap-5' >
            <h1 className='font-bold text-5xl tracking-wide text-white text-center'>
              Comunidade Plenitude
            </h1>
            <h2 className='font-semibold text-xl text-white text-center'>
              Lugar de novos começos
            </h2>
          </div>
        </section>

        {/* <section className="relative flex items-center justify-center h-[calc(100vh-64px)] overflow-hidden">
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
        </section> */}

        <section className='h-96 flex flex-col align-middle justify-center px-5 md:px-2' >
          <h3 className='text-center font-bold text-gray-500 text-xl lg:px-80 lg:text-2xl'>
            A Comunidade Plenitude é uma igreja evangélica com o
            <span className='text-gray-900'> propósito </span>
            de conduzir pessoas a um relacionamento intenso com Deus.
          </h3>
        </section>

        <section className='bg-blue-100/30 md:flex flex-col align-middle justify-center'>
          <div className="max-w-full mx-auto py-16 px-4 sm:px-6  lg:px-8">
            <LibraryIcon className='h-12 w-full text-blue-600' />
            <h3 className='font-bold text-3xl p-5 text-gray-800 text-center'>
              Conheça nossas <span className='text-blue-600'>lideranças</span>
            </h3>

            <ImageSlider
              data={leaderships.map(leader => ({
                slug: leader.slug,
                title: leader.name,
                imageURL:leader.avatar,
                shortDescription: leader.role,
              }))}
            />

            <Link href='/ministries' passHref>
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

            <Link href='/churches' passHref>
              <a className='w-32 bg-gray-500 text-white text-center hover:bg-gray-600 py-3 px-5 rounded-md self-center md:self-start'>
                Conferir
              </a>
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

        <Testimonials testimonials={testimonials} />

        <Contribution />

        <Contact />

      </main>

      <Footer />

    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: testimonialData } = await client.query<GetTestimonialsResponse>({
    query: GET_TESTIMONIALS_QUERY,
  });

  const { data: leaderShipData } = await client.query<GetLeadershipsResponse>({
    query: GET_LEADERSHIPS_QUERY,
    variables: { first: 5 }
  });

  const leaderships = leaderShipData && leaderShipData.leaderships
    ? leaderShipData.leaderships
    : [];

  const testimonials = testimonialData && testimonialData.testimonials
      ? testimonialData.testimonials
      : [];

  return {
    props: {
      testimonials,
      leaderships,
    },
    revalidate: 60 * 60 * 12 // 12 hours
  };
}
