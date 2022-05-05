import Head from 'next/head';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export default function About() {
  return (
    <div>
      <Head>
        <title>Sobre | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='about' />

      <main>
        <section className="bg-red-400 py-10">
          <div className='min-h-[calc(100vh-64px)] flex flex-col align-middle justify-center text-center text-white' >
            <h1 className='font-bold text-5xl p-5 tracking-wide'>Sobre nós</h1>
          </div>
        </section>

        <div className='flex flex-col gap-10 px-5 md:px-10 lg:px-40 py-20'>

          <section  className='font-medium text-gray-700 text-lg tracking-wide text-justify hyphens-auto'>
            <h3 className='text-4xl text-center font-bold text-gray-500 mb-10'>
              Nossa História
            </h3>

            <p>
              Nos meados de 2009, a partir do coração de Deus para o coração de
              um servo, nasce um projeto, um sonho, um povo e uma igreja,
              a Comunidade Plenitude.
            </p>

            <br />

            <p>
              Com apenas três pessoas em uma garagem, o servo de
              Deus (Ap.Diego Melo) inicia uma serie de cultos na casa da irmã
              Francisca, naquele momento, sem a intenção de abrir um ministério
              próprio, o Ap.Diego Melo foi surpreendido pelo Senhor com o
              acréscimo de pessoas que participavam dos cultos.
              Em um curto prazo, foi necessário alugar um lugar maior e que
              atendesse aquela quantidade de pessoas.
            </p>

            <br />

            <p>
              O primeiro salão se encontrava no bairro São João, um salão pequeno,
              sem som, nem sequer havia altar, entretanto, esse salão tinha
              o principal que era a presença do Senhor. No decorrer dos cultos a
              igreja crescia cada vez mais e após 2 anos(aproximadamente) foi
              necessário mudar para um salão maior, assim aconteceu também nos
              outros dois anos seguintes, por conta da quantidade de pessoas que
              se agregavam aos cultos.
            </p>

            <br />

            <p>
              Atualmente, a Comunidade Plenitude tem seu próprio local, como
              também várias igrejas espalhadas pelo Brasil, isso aconteceu por
              conta da perseverança do Ap.Diego Melo em relação a promessa de
              Deus, como também pela contribuição de cada pessoa na obra.
            </p>
          </section>

          <section  className='font-medium text-gray-700 text-lg tracking-wide text-justify hyphens-auto'>
            <h3 className='text-4xl text-center font-bold text-gray-500 mb-10'>
              Nossa Missão
            </h3>

            <p>
              Ser uma igreja que glorifique o nome de Deus e que cultive a
              comunhão uns com os outros, cumprindo o ide de Jesus e seguindo
              seus princípios por meio da oração e da evangelização, tendo
              em vista sempre a continuidade de sua obra.
            </p>
          </section>

          <section  className='font-medium text-gray-700 text-lg tracking-wide text-justify hyphens-auto'>
            <h3 className='text-4xl text-center font-bold text-gray-500 mb-10'>
              Nossa visão
            </h3>

            <p>
              Levar as pessoas a buscar um relacionamento intenso com Deus, amar
              e servir ao próximo, sempre focando em fazer o nome de Jesus
              conhecido entre os povos.
            </p>
          </section>

          <section  className='font-medium text-gray-700 text-lg tracking-wide text-justify hyphens-auto'>
            <h3 className='text-4xl text-center font-bold text-gray-500 mb-10'>
              Nossas Crenças
            </h3>

            <p>
              <strong className='text-gray-800'>Acreditamos </strong>
              que há um só Deus, um único mediador entre Deus e a humanidade
              e na existência do Espírito Santo como nosso guia e consolador.
            </p>

            <br />

            <p>
              <strong className='text-gray-800'>Acreditamos </strong>
              que a Bíblia é a palavra de Deus e que dela vem todos os
              princípios da nossa fé e conduta.
            </p>

            <br />

            <p>
              <strong className='text-gray-800'>Acreditamos </strong>
              que fomos chamados por Deus para levarmos seu reino adiante.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
