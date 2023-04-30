import { GetStaticPaths, GetStaticProps } from 'next';
import { AiOutlineInstagram } from 'react-icons/ai';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { client } from '@/lib/apollo';

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
    instagram: string | null;
    phone: string | null;
    couples: Array<{
      id: string;
      name: string;
      avatar: string;
      role: string;
    }>
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
      instagram
    	phone
      couples {
        name
        id
        avatar
        role
      }
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
          <h3 className='text-xl md:text-2xl font-bold text-gray-500 text-center md:w-2/3 self-center'>
            {church.description}
          </h3>

          <hr className='w-1/4 self-center my-5 md:my-10' />

          {church.instagram && (
            <a href={church.instagram} target="_blank" rel="noopener noreferrer">
              <AiOutlineInstagram className='h-8 w-8 text-gray-500 hover:text-black mx-auto'/>
            </a>
          )}

          <p className='font-semibold text-1xl text-gray-700 text-center self-center'>
            <strong>Cultos: </strong>{church.serviceTimes}
          </p>

          <p className='font-semibold text-1xl text-gray-700 text-center self-center'>
            <strong>Endereço: </strong>{church.street}, {church.number}, {church.district}
          </p>

          {church.phone &&
            <p className='font-semibold text-1xl text-gray-700 text-center self-center'>
              <strong>Contato: </strong>{church.phone}
            </p>
          }
        </section>

        {!!church.couples.length && (
          <section className='p-10'>
            <h3 className='text-2xl font-bold text-center text-gray-900'>
              Liderança da Igreja
            </h3>

            <div className='mt-20 flex flex-col gap-10 md:gap-0 md:flex-row md:justify-evenly align-middle justify-center'>
              {church.couples.map(couple => (
                <div key={couple.id} className='flex flex-col justify-center align-middle gap-1'>
                  <div className='self-center'>
                    <Image
                      className="rounded-full self-center object-cover object-center w-36 h-36"
                      src={couple.avatar}
                      alt={couple.name}
                      width={144}
                      height={144}
                    />
                  </div>

                  <p className='text-center font-semibold'>{couple.name}</p>
                  <span className='text-center text-gray-600'>{couple.role}</span>
                </div>
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
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
