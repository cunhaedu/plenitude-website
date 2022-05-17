import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { churches } from '../../data/churchs';

export default function Churches() {
  return (
    <div>
      <Head>
        <title>Igrejas | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='churches' />

      <main className='bg-blue-100/30'>

        <section className="bg-place bg-center bg-cover bg-no-repeat md:bg-fixed">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-3xl md:text-5xl p-5 tracking-wide lg:w-6/12 text-center self-center'>
              Conheça a localização das nossas igrejas
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
                href={`/churches/${church.identifier}`}
                key={church.identifier}
              >
                <a className="bg-white h-56 rounded-md hover:shadow-md shadow-gray-300 duration-300">
                  <div className="w-full h-28 aspect-none relative">
                    <Image
                      src={church.image}
                      alt={church.imageDescription}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-t-md'
                    />
                  </div>
                  <div className='p-3'>
                    <h3 className="font-medium text-gray-800">
                        <span aria-hidden="true" className="inset-0" />
                        {church.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{church.localization}</p>
                    <p className="text-sm text-gray-500">{church.complement}</p>
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
