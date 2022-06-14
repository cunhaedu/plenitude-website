import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ministries } from '../../data/ministries';
import { IMinistry } from '../../interfaces/IMinistry';
import { VideoPlayer } from '../../components/VideoPlayer';

type ChurchProps = {
  ministry: IMinistry;
};

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default function Church({ ministry }: ChurchProps) {
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
              src={ministry.image}
              alt={ministry.imageDescription}
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

          <VideoPlayer src={ministry.videoUrl} />
        </section>

        <section className='bg-violet-400/90 px-5 py-24 flex flex-col gap-5 align-middle justify-center'>
          <h2 className='text-center text-white font-medium text-xl md:text-2xl max-w-lg self-center'>{ministry.bibleVerse.text}</h2>
          <p className='text-center text-lg text-gray-100'>{ministry.bibleVerse.book} {ministry.bibleVerse.capitule}:{ministry.bibleVerse.verses}</p>
        </section>

        {/* Church leadership */}
        <section className='p-10'>
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
        </section>

      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const ministry = ministries.find(e => e.identifier === slug);

  if (!ministry) {
    return {
      redirect: {
        permanent: false,
        destination: "/ministries"
      }
    }
  }

  return {
    props: {
      ministry,
    },
    // revalidate: 60 * 60 * 24, // 24 hours
  };
};
