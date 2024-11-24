import { GetStaticProps } from 'next';
import Image from 'next/image';
import { gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { client } from '@/lib/apollo';

type GetChurchesResponse = {
  churches: Array<{
    slug: string;
    name: string;
    street: string;
    number: string;
    district: string;
    cityImageURL: string;
  }>
}

const GET_CHURCHES_QUERY = gql`
  query Churches {
    churches {
      slug
      name
      street
      number
      district
      cityImageURL
    }
  }
`

export default function Churches({ churches }: GetChurchesResponse) {
  return (
    <div>
      <Head>
        <title>Igrejas | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Venha conhecer todas as nossas filiais e seja mais que bem vindo ao visitar a Plenitude mais próxima de você."
          key="desc"
        />

        <meta property="og:title" content="Igrejas | Comunidade Plenitude" />
        <meta
          property="og:description"
          content="Venha conhecer todas as nossas filiais e seja mais que bem vindo ao visitar a Plenitude mais próxima de você."
        />
        <meta
          property="og:image"
          content="/assets/pages/places/background.webp"
        />
      </Head>

      <Header currentPage='churches' />

      <main className='bg-blue-100/30'>

        <section className="bg-place bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-4xl md:text-5xl p-5 tracking-wide'>
              Confira a localização das nossas igrejas
            </h1>
          </div>
        </section>

        <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold text-center tracking-tight text-gray-900">
            <span className='text-blue-600'>Encontre </span>
            a igreja mais próxima de você
          </h2>

          <div className="mt-24 md:mt-16 md grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {churches.map(church => (
              <Link
                href={`/churches/${church.slug}`}
                key={church.slug}
                className="bg-white h-56 rounded-md hover:shadow-md shadow-gray-300 duration-300"
              >
                <div className="w-full h-28 aspect-none relative">
                  <Image
                    src={church.cityImageURL}
                    alt={church.name}
                    width={300}
                    height={400}
                    className='rounded-t-md object-cover w-full h-full'
                  />
                </div>
                <div className='p-3'>
                  <h3 className="font-medium text-gray-800">
                      <span aria-hidden="true" className="inset-0" />
                      {church.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {church.street}, {church.number}
                  </p>
                  <p className="text-sm text-gray-500">{church.district}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<GetChurchesResponse>({
    query: GET_CHURCHES_QUERY,
  });

  return {
    props: {
      churches: data?.churches || [],
    },
    revalidate: 60 * 60 * 24 // 24 hours
 };
}
