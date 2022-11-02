import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { VideoPlayer } from '../../components/VideoPlayer';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';
import Link from 'next/link';

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
    mainColor: string;
    leaderships: Array<{
      slug: string;
      name: string;
      avatar: string;
    }>;
  }
}

const GET_MINISTRY_QUERY = gql`
  query Ministry ($slug: String)  {
    ministry(where: {slug: $slug}) {
      name
      description
      slug
      cover
      video
      book
      phrase
      chapter
      verseNumber
      mainColor
      leaderships {
        slug
        name
        avatar
      }
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
        <title>{`${ministry.name} | Comunidade Plenitude`}</title>

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
        <section>
          <div className="w-full h-[calc(100vh-64px)] relative px-10">
            <Image
              src={ministry.cover}
              alt={ministry.name}
              fill
              className='brightness-50 object-cover'
            />
            <div className="w-full h-full relative flex align-middle justify-center">
              <h2 className="text-center self-center text-4xl font-extrabold tracking-tight text-white">
                {ministry.name}
              </h2>
            </div>
          </div>
        </section>

        <section className='bg-gray-50 px-5 py-24 flex flex-col gap-9 align-middle justify-center'>
          <h3 className='text-center md:w-9/12 self-center pb-3 text-gray-700 font-medium text-lg md:text-2xl'>{ministry.description}</h3>

          <VideoPlayer src={ministry.video}/>
        </section>

        <section
          style={{ background: ministry.mainColor }}
          className='px-5 py-24 flex flex-col gap-5 align-middle justify-center'>
          <h2 className='text-center text-white font-medium text-xl md:text-2xl max-w-lg self-center'>{ministry.phrase}</h2>
          <p className='text-center text-lg text-gray-100'>{ministry.book} {ministry.chapter}:{ministry.verseNumber}</p>
        </section>

        {!!ministry.leaderships.length && (
          <section className='p-10' style={{ background: `${ministry.mainColor}20` }}>
            <h3
              className='text-2xl font-bold text-center'
              style={{ color: ministry.mainColor }}
            >
              Liderança
            </h3>

            <div className='mt-20 flex flex-col gap-10 md:gap-0 md:flex-row md:justify-evenly align-middle justify-center'>
              {ministry.leaderships.map(leadership => (
                <Link key={leadership.slug} href={`/leadership/${leadership.slug}`}>
                  <a className='flex flex-col justify-center align-middle gap-1'>
                    <Image
                      src={leadership.avatar}
                      alt={leadership.name}
                      width={144}
                      height={144}
                      className="w-36 h-36 rounded-full self-center object-cover"
                    />

                    <p className='text-center font-semibold text-gray-800'>{leadership.name}</p>
                    {/* <span className='text-center text-gray-600'>{leadership.position}</span> */}
                  </a>
                </Link>
              ))}
            </div>
          </section>
        )}

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
