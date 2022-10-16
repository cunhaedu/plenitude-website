import { AiFillInstagram as InstagramIcon } from 'react-icons/ai';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';
import Image from 'next/future/image';

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
    leaderships {
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
        <div className='min-w-full relative'>
          <Image
            src={leadership.cover}
            alt={leadership.name}
            width={1148}
            height={450}
            className='object-cover w-full'
          />
        </div>

        <section className="max-w-2xl mx-auto py-8 px-6 md:py-16 lg:max-w-7xl lg:px-8">
          <section>
            <h1 className='text-2xl md:text-4xl text-gray-700'>
              {leadership.name}
            </h1>

            <h2 className='text-sm md:text-lg text-gray-500 pt-1'>
              {leadership.role}
            </h2>
          </section>

          {leadership.instagram && (
              <div className='flex gap-4 align-middle justify-start my-8'>
              <a
                href={leadership.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className='no-underline h-8 w-8'
              >
                <InstagramIcon className='h-8 w-8 text-gray-500' />
              </a>
              </div>
            )}

          <p className='font-medium text-lg text-gray-500 mt-10 min-h-[20vh] lg:min-h-full'>
            {leadership.bio}
          </p>
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
    revalidate: 60 * 60 * 12 // 12 hours
  };
};
