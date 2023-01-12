import { AiOutlineInstagram as InstagramIcon } from 'react-icons/ai';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { client } from '@/lib/apollo';

import styles from './styles.module.scss';

type Params = ParsedUrlQuery & {
  slug: string;
}

type GetLeaderShipResponse = {
  leadership: {
    name: string;
    bio: string;
    cover: string;
    role: string;
    instagram?: string;
  }
}

const GET_LEADERSHIP_QUERY = gql`
  query Leadership ($slug: String)  {
    leadership(where: {slug: $slug}) {
      name
      bio
      cover
      role
      instagram
    }
  }
`

const GET_LEADERSHIPS_QUERY = gql`
  query Leaderships {
    leaderships (where: {role: "Liderança Sênior"}) {
      slug
    }
  }
`

export default function Leadership({ leadership }: GetLeaderShipResponse) {
  return (
    <div>
      <Head>
        <title>{`${leadership.name} | Comunidade Plenitude`}</title>

        <meta
          name="description"
          content={`Conheça um pouco mais sobre o(a) ${leadership.role} ${leadership.name}`}
          key="desc"
        />

        <meta property="og:title" content={`${leadership.name} | Comunidade plenitude`} />
        <meta
          property="og:description"
          content={`Conheça um pouco mais sobre o(a) ${leadership.role} ${leadership.name}`}
        />
        <meta
          property="og:image"
          content={leadership.cover}
        />
      </Head>

      <Header />

      <main>
        <div className={styles.leadership_header}>
          <Image
            src={leadership.cover}
            alt={leadership.name}
            width={1148}
            height={450}
          />
        </div>

        <section className={styles.leadership_body}>
          <div>
            <h1>{leadership.name}</h1>
            <h2>{leadership.role}</h2>
          </div>

          {leadership.instagram && (
            <div className={styles.leadership_body__instagram_container}>
              <a
                href={leadership.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
          )}

          <p>{leadership.bio}</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ leaderships: Array<{ slug: string }> }>({
    query: GET_LEADERSHIPS_QUERY,
  });

  return {
    paths: data?.leaderships && data.leaderships.length
      ? data.leaderships.map(leadership => ({ params: { slug: leadership.slug } }))
      : [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const { data } = await client.query<GetLeaderShipResponse>({
    query: GET_LEADERSHIP_QUERY,
    variables: { slug }
  });

  if (!data || !data.leadership) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  return {
    props: {
      leadership: data.leadership,
    },
    revalidate: 60 * 60 * 32 // 32 hours
  };
};
