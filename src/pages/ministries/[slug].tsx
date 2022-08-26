import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { VideoPlayer } from '../../components/VideoPlayer';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';

type Params = ParsedUrlQuery & {
  slug: string;
}

type GetMinistryResponse = {
  ministry: {
    name: string;
    description: string;
    slug: string;
    cover: string;
    video: string;
    book: string;
    phrase: string;
    chapter: string;
    verseNumber: string;
  }
}

const GET_MINISTRY_QUERY = gql`
  query Ministry ($slug: String)  {
    ministry(where: {slug: $slug}) {
      id
      name
      description
      slug
      cover
      video
      book
      phrase
      chapter
      verseNumber
    }
  }
`

const GET_MINISTRIES_QUERY = gql`
  query Ministries {
    ministries {
      slug
    }
  }
`

export default function Church({ ministry }: GetMinistryResponse) {
  return (
    <div>
      <Head>
        <title>{ministry.name} | Comunidade Plenitude</title>

        <meta
          name="description"
          content={`Conheça um pouco mais sobre a ${ministry.name}, o que fazemos e qual o nosso propósito`}
          key="desc"
        />

        <meta property="og:title" content={`${ministry.name} | Comunidade plenitude`} />
        <meta
          property="og:description"
          content={`Conheça um pouco mais sobre a ${ministry.name}, o que fazemos e qual o nosso propósito`}
        />
        <meta
          property="og:image"
          content={ministry.cover}
        />
      </Head>

      <Header currentPage='ministries' />

      <main>
        <section
          style={{backgroundImage: `url('${ministry.cover}')`}}
          className="bg-about bg-center bg-cover bg-no-repeat md:bg-fixed"
        >
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5 tracking-wide'>
              {ministry.name}
            </h1>
          </div>
        </section>

        <section className='bg-gray-50 px-5 py-24 flex flex-col gap-9 align-middle justify-center'>
          <h3 className='text-center md:w-9/12 self-center pb-3 text-gray-700 font-medium text-lg md:text-2xl'>{ministry.description}</h3>

          <VideoPlayer src={ministry.video}/>
        </section>

        <section className='bg-violet-400/90 px-5 py-24 flex flex-col gap-5 align-middle justify-center'>
          <h2 className='text-center text-white font-medium text-xl md:text-2xl max-w-lg self-center'>{ministry.phrase}</h2>
          <p className='text-center text-lg text-gray-100'>{ministry.book} {ministry.chapter}:{ministry.verseNumber}</p>
        </section>

        {/* Church leadership */}
        {/* <section className='p-10'>
          <h3 className='text-2xl font-bold text-center text-gray-900'>
            Liderança
          </h3>

          <div className='mt-20 flex flex-col gap-10 md:gap-0 md:flex-row md:justify-evenly align-middle justify-center'>
            {ministry.leadership.map(leadership => (
              <div key={leadership.id} className='flex flex-col justify-center align-middle gap-1'>
                <img
                  className="h-36 w-36 rounded-full self-center"
                  src={leadership.image}
                  alt={leadership.name}
                />

                <p className='text-center font-semibold'>{leadership.name}</p>
                <span className='text-center text-gray-600'>{leadership.position}</span>
              </div>
            ))}
          </div>
        </section> */}

      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ ministries: Array<{ slug: string }> }>({
    query: GET_MINISTRIES_QUERY,
  });

  return {
    paths: data?.ministries && data.ministries.length
      ? data.ministries.map(ministry => ({ params: { slug: ministry.slug } }))
      : [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const { data } = await client.query<GetMinistryResponse>({
    query: GET_MINISTRY_QUERY,
    variables: { slug }
  });

  if (!data || !data.ministry) {
    return {
      redirect: {
        permanent: false,
        destination: "/ministries"
      }
    }
  }

  return {
    props: {
      ministry: data.ministry,
    },
    revalidate: 60 * 60 * 12 // 12 hours
  };
};
