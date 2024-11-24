import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { client } from '@/lib/apollo';

import styles from './ministries-style.module.scss';

type GetMinistriesResponse = {
  ministries: Array<{
    name: string;
    description: string;
    slug: string;
    cover: string;
  }>
}

const GET_MINISTRIES_QUERY = gql`
  query Ministries {
    ministries(orderBy: name_ASC) {
      name
      description
      slug
      cover
    }
  }
`

export default function Ministries({ministries}: GetMinistriesResponse) {
  return (
    <div>
      <Head>
        <title>Redes | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Fique por dentro de todas as redes dentro da Comunidade Plenitude"
          key="desc"
        />

        <meta property="og:title" content="Redes | Comunidade plenitude" />
        <meta
          property="og:description"
          content="Fique por dentro de todas as redes dentro da Comunidade Plenitude"
        />
        <meta
          property="og:image"
          content="/assets/pages/ministries/background.webp"
        />
      </Head>

      <Header currentPage='ministries' />

      <main className={styles.ministries}>
        <section className={styles.ministries__header}>
          <div>
            <h1>Conheça as nossas redes</h1>
          </div>
        </section>

        <section className={styles.ministries__list}>
          <h2>Fique por <span>dentro</span> das nossas redes</h2>

          <div>
            {ministries.map(ministry => (
              <Link
                href={`/ministries/${ministry.slug}`}
                key={ministry.slug}
                className={styles.ministry_card}
              >
                <div>
                  <Image
                    src={ministry.cover}
                    alt={ministry.name}
                    fill
                  />
                </div>

                <h3>{ministry.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<GetMinistriesResponse>({
    query: GET_MINISTRIES_QUERY,
  });

  return {
    props: {
      ministries: data?.ministries || [],
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
}
