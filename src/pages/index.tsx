import Head from 'next/head';
import Header from '../components/Header';
import { LibraryIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Footer } from '../components/Footer';

interface ILeaderShip {
  name: string;
  description: string;
  image: string;
}

const leaderShips: ILeaderShip[] = [
  {
    name: 'Ap. Diego Melo',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/apostolo_diego/01.jpg')]"
  },
  {
    name: 'Bispa. Patricia Melo',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/bispa_patricia/02.jpg')]"
  },
  {
    name: 'Pr. Emerson',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/pastor_emerson/02.jpg')]"
  },
  {
    name: 'Ev. Juliana',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/worship/evangelista_juliana/02.jpg')]"
  },
  {
    name: 'Leandro Santos',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/consolidation/leandro/01.jpg')]"
  },
]

export default function Home () {
  return (
    <div>
      <Head>
        <title>Início | Comunidade Plenitude</title>
      </Head>

      <Header />

      <main>
        <section className="bg-home bg-center bg-cover bg-no-repeat md:bg-center">
          <div className='min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-90px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5'>Comunidade Plenitude</h1>
            <p className='font-semibold text-xl'>Lugar de novos começos</p>
          </div>
        </section>

        <section className='h-96 flex flex-col align-middle justify-center px-2' >
          <h2 className='text-center font-bold text-gray-500 text-xl lg:px-80 lg:text-2xl'>
            A Comunidade Plenitude é uma igreja com o
            <span className='text-gray-900'> propósito </span>
            de conduzir pessoas a um relacionamento transformador com Jesus Cristo.
          </h2>
        </section>

        <section className='bg-[#ECF3FF] flex flex-col align-middle justify-center py-10' >
          <LibraryIcon color='#648BC6' className='h-12 w-full' />
          <h2 className='font-bold text-3xl p-5 text-gray-800 text-center'>
            Conheça nossa <span className='text-[#648BC6]'>liderança</span>
          </h2>

          <div className='overflow-x-scroll scrollbar-thin my-5 flex'>
              {leaderShips.map(leader => {
                return (
                <div key={leader.name} className={`${leader.image} bg-no-repeat bg-cover bg-center rounded-md mx-5`}>
                  <div className='h-80 w-64 flex flex-col bg-gradient-to-t from-black'>
                    <span className='mt-60 text-white font-bold pl-5'>{leader.name}</span>
                    <span className='text-white pl-5'>{leader.description}</span>
                  </div>
                </div>
              )})}
          </div>

          <Link href='/ministries'>
            <a className='underline font-semibold text-[#648BC6] text-center hover:text-[#426396]'>
              Ver tudo
            </a>
          </Link>
        </section>
      </main>

      <Footer />

    </div>
  )
}
