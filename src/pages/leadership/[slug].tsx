import { AiFillInstagram as InstagramIcon } from 'react-icons/ai';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';

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
        <title>{leadership.name} | Comunidade Plenitude</title>

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
        <div
          style={{backgroundImage: `url('${leadership.cover}')`}}
          className='bg-center bg-cover bg-no-repeat min-w-full h-[30vh] md:h-[40vh] lg:h-[70vh]'
        ></div>

        <section className='flex align-middle justify-center py-10 px-10'>
          <div className='flex flex-col self-center md:w-screen-md lg:w-9/12 max-w-4xl gap-8'>
            <section>
              <h1 className='text-2xl md:text-4xl text-gray-700'>
                {leadership.name}
              </h1>

              <h2 className='text-sm md:text-lg text-gray-500 pt-1'>
                {leadership.role}
              </h2>
            </section>

            {leadership.instagram && (
              <section className='flex gap-4 align-middle justify-start'>
                {leadership.instagram && (
                  <a
                    href={leadership.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='no-underline h-8 w-8'
                  >
                    <InstagramIcon className='h-8 w-8 text-gray-500' />
                  </a>
                )}
              </section>
            )}

            <p className='font-medium text-lg text-gray-500'>{leadership.bio}</p>
          </div>
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
