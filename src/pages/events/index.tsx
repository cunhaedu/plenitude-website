import Head from 'next/head';
import InProgress from '../../components/InProgress';

export default function Events() {
  return (
    <div>
      <Head>
        <title>Eventos | Comunidade Plenitude</title>

        <meta
          name="description"
          content="Fique por dentro de todos os eventos que estão acontecendo."
          key="desc"
        />
      </Head>

      <InProgress />
    </div>
  )
}
