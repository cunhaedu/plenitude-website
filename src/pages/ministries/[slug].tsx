import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { VideoPlayer } from '../../components/VideoPlayer';
import { client } from '../../lib/apollo';

type Params = ParsedUrlQuery & {
  slug: string;
}

type GetMinistryResponse = {
  ministry: {
    name: string;
    description: string;
    slug: string;
    coverID: string;
    videoID: string;
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
      coverID
      videoID
      book
      phrase
      chapter
      verseNumber
    }
  }
`

export default function Church({ ministry }: GetMinistryResponse) {
  return (
    <div>
      <Head>
        <title>{ministry.name} | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='ministries' />

      <main>
        <section>
          <div className="w-full h-[calc(100vh-64px)] relative px-10">
            <Image
              src={`https://drive.google.com/uc?export=view&id=${ministry.coverID}`}
              alt={ministry.name}
              layout='fill'
              objectFit='cover'
              className='brightness-50'
            />
            <div className="w-full h-full relative flex align-middle justify-center">
              <h2 className="text-center self-center text-4xl font-extrabold tracking-tight pb-8 pt-14 text-white">
                {ministry.name}
              </h2>
            </div>
          </div>
        </section>

        <section className='bg-gray-50 px-5 py-24 flex flex-col gap-9 align-middle justify-center'>
          <h3 className='text-center md:w-9/12 self-center pb-3 text-gray-700 font-medium text-lg md:text-2xl'>{ministry.description}</h3>

          <VideoPlayer src={`https://drive.google.com/file/d/${ministry.videoID}/preview`}/>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const { data } = await client.query<GetMinistryResponse>({
    query: GET_MINISTRY_QUERY,
    variables: { slug }
  });

  if (!data) {
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
    }
  };
};
