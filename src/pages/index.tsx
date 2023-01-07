import { LibraryIcon } from '@heroicons/react/solid';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import { Testimonials } from '@/components/Testimonials';
import { Contribution } from '@/components/Contribution';
import { ImageSlider } from '@/components/ImageSlider';
import { Contact } from '@/components/Contact';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { client } from '@/lib/apollo';

import styles from '../styles/home.module.scss';

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
    leaderships (where: {role: "Liderança Sênior"}) {
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
        <section className={styles.home_header}>
          <div>
            <h1>Comunidade Plenitude</h1>
            <h2>Lugar de novos começos</h2>
          </div>

          <video autoPlay loop muted playsInline>
            <source src="/assets/videos/main_720p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className={styles.home_about_section}>
          <h3>
            A Comunidade Plenitude é uma igreja evangélica com o
            <span> propósito </span>
            de conduzir pessoas a um relacionamento intenso com Deus.
          </h3>
        </section>

        <section className={styles.home_leadership_section}>
          <div>
            <LibraryIcon />
            <h3>Conheça nossa <span>liderança</span></h3>

            <ImageSlider
              data={leaderships.map(leader => ({
                slug: leader.slug,
                title: leader.name,
                imageURL:leader.avatar,
                shortDescription: leader.role,
              }))}
            />

            <Link href='/ministries' passHref>
              <a className={styles.home_leadership_section__view_more}>
                Ver tudo
              </a>
            </Link>
          </div>
        </section>

        <section className={styles.home_localization}>
          <div>
            <h2>
              <FaMapMarkerAlt /> Localização
            </h2>

            <p>Confira nossa igreja mais próxima de você</p>

            <Link href='/churches' passHref>
              <a>Conferir</a>
            </Link>
          </div>

          <div>
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
