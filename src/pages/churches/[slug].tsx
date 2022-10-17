import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';

type Params = ParsedUrlQuery & {
  slug: string;
}

type GetChurchResponse = {
  church: {
    name: string;
    city: string;
    state: string;
    street: string;
    number: string;
    district: string;
    serviceTimes: string;
    cover: string;
    cityImageURL: string;
    description: string;
  };
}

const GET_CHURCH_QUERY = gql`
  query Church ($slug: String) {
    church(where: {slug: $slug}) {
      name
      city
      state
      street
      number
      district
      serviceTimes
      cover
      cityImageURL
      description
    }
  }
`


const GET_CHURCHES_QUERY = gql`
  query Churches {
    churches {
      slug
    }
  }
`

export default function Church({ church }: GetChurchResponse) {
  return (
    <div>
      <Head>
        <title>{`${church.name} | Comunidade Plenitude`}</title>

        <meta
          name="description"
          content={`Conheça um pouco mais da comunidade Plenitude em ${church.city}`}
          key="desc"
        />

        <meta property="og:title" content={`${church.name} | Comunidade plenitude`} />
        <meta
          property="og:description"
          content={`Conheça um pouco mais da comunidade Plenitude em ${church.city}`}
        />
        <meta
          property="og:image"
          content={church.cover ? church.cover : church.cityImageURL}
        />
      </Head>

      <Header currentPage='churches' />

      <main>
        <section>
          <div className="w-full h-[calc(100vh-64px)] relative px-10">
            <Image
              src={church.cover ? church.cover : church.cityImageURL}
              alt={church.name}
              fill
              className='brightness-50 object-cover'
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

          <h4 className='text-1xl font-bold text-gray-700 text-center self-center'>
            Cultos
          </h4>
          <p className='font-semibold text-1xl text-gray-700 text-center self-center'>
            {church.serviceTimes}
          </p>
        </section>

        {/* Church leadership */}
        {/* <section className='p-10'>
          <h3 className='text-2xl font-bold text-center text-gray-900'>
            Liderança da Igreja
          </h3>

          <div className='mt-20 flex flex-col gap-10 md:gap-0 md:flex-row md:justify-evenly align-middle justify-center'>
            {church.leadership.map(leadership => (
              <div key={leadership.id} className='flex flex-col justify-center align-middle gap-1'>
                <div className='self-center'>
                  <Image
                    className="rounded-full self-center object-cover object-center"
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
        </section> */}

      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ churches: Array<{ slug: string }> }>({
    query: GET_CHURCHES_QUERY,
  });

  return {
    paths: data && data.churches && data.churches.length
      ? data.churches.map(church => ({ params: { slug: church.slug } }))
      : [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  const { data } = await client.query<GetChurchResponse>({
    query: GET_CHURCH_QUERY,
    variables: { slug }
  });

  if (!data || !data.church) {
    return {
      redirect: {
        permanent: false,
        destination: "/churches"
      }
    }
  }

  return {
    props: {
      church: data.church,
    },
    revalidate: 60 * 60 * 12 // 12 hours
  };
};
