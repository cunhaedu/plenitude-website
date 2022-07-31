import { gql } from '@apollo/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { client } from '../../lib/apollo';

type GetMinistriesResponse = {
  ministries: Array<{
    name: string;
    description: string;
    slug: string;
    coverID: string;
  }>
}

const GET_MINISTRIES_QUERY = gql`
  query Ministries {
    ministries {
      name
      description
      slug
      coverID
    }
  }
`

export default function Ministries({ministries}: GetMinistriesResponse) {
  console.log(ministries);

  return (
    <div>
      <Head>
        <title>Redes | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='ministries' />

      <main className='bg-rose-100/30'>
        <section className="bg-ministries bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5 tracking-wide'>Conheça as nossas redes</h1>
          </div>
        </section>

        <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold text-center tracking-tight text-gray-900">
            <span className='text-rose-600'>Fique </span>
            por dentro das nossas redes
          </h2>

          <div className="mt-24 md:mt-16 md grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {ministries.map(ministry => (
              <Link
                href={`/ministries/${ministry.slug}`}
                key={ministry.slug}
              >
                <a className="bg-white h-56 rounded-md hover:shadow-md shadow-gray-300 duration-300">
                  <div className="w-full h-36 aspect-none relative">
                    <Image
                      src={`https://drive.google.com/uc?export=view&id=${ministry.coverID}`}
                      alt={ministry.name}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-t-md'
                    />
                  </div>
                  <div className='p-3'>
                    <h3 className="font-medium text-gray-800">
                        <span aria-hidden="true" className="inset-0" />
                        {ministry.name}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query<GetMinistriesResponse>({
    query: GET_MINISTRIES_QUERY,
  });

  return {
    props: {
      ministries: data.ministries,
    },
 };
}
