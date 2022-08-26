import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import Head from 'next/head';

import { getWeekDayNameFromNumber } from '../../helpers/weekDay';
import { IChurch } from '../../interfaces/IChurch';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { churches } from '../../data/churches';

type ChurchProps = {
  church: IChurch;
};

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default function Church({ church }: ChurchProps) {
  return (
    <div>
      <Head>
        <title>{church.name} | Comunidade Plenitude</title>

        <meta
          name="description"
          content={`Conheça um pouco mais da comunidade Plenitude em ${church.localization}`}
          key="desc"
        />

        <meta property="og:title" content={`${church.name} | Comunidade plenitude`} />
        <meta
          property="og:description"
          content={`Conheça um pouco mais da comunidade Plenitude em ${church.localization}`}
        />
        <meta
          property="og:image"
          content={church.collageImage}
        />
      </Head>

      <Header currentPage='churches' />

      <main>
        <section>
          <div className="w-full h-[calc(100vh-64px)] relative px-10">
            <Image
              src={church.collageImage}
              alt={church.imageDescription}
              layout='fill'
              objectFit='cover'
              className='brightness-50'
            />
            <div className="w-full h-full relative flex align-middle justify-center">
              <h2 className="text-center self-center text-4xl font-extrabold tracking-tight text-white">
                {church.name}
              </h2>
            </div>
          </div>
        </section>

        <section className='bg-gray-50 px-5 py-24 flex flex-col gap-3 align-middle justify-center'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-500 text-center md:w-2/3 self-center'>{church.description}</h3>

          <hr className='w-1/4 self-center my-3' />

          <h4 className='text-1xl font-bold text-gray-700 text-center self-center'>Cultos</h4>
          <p className='font-semibold text-1xl text-gray-700 text-center self-center'>{church.worshipServices.map(worshipService => {
            return `${getWeekDayNameFromNumber(worshipService.weekDay)} ${worshipService.times.join(' e ')}`
          }).join(' | ')}</p>
        </section>

        {/* Church leadership */}
        <section className='p-10'>
          <h3 className='text-2xl font-bold text-center text-gray-900'>
            Liderança da Igreja
          </h3>

          <div className='mt-20 flex flex-col gap-10 md:gap-0 md:flex-row md:justify-evenly align-middle justify-center'>
            {church.leadership.map(leadership => (
              <div key={leadership.id} className='flex flex-col justify-center align-middle gap-1'>
                <div className='self-center'>
                  <Image
                    className="rounded-full self-center"
                    src={leadership.image}
                    alt={leadership.name}
                    width={144}
                    height={144}
                  />
                </div>

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

  const church = churches.find(e => e.identifier === slug);

  if (!church) {
    return {
      redirect: {
        permanent: false,
        destination: "/churches"
      }
    }
  }

  return {
    props: {
      church,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
