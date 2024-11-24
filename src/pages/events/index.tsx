import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import Head from 'next/head';

import { EventsEmptyState } from '@/components/EventsEmptyState';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { client } from '@/lib/apollo';

import styles from './styles.module.scss';
import Image from 'next/image';
import { formatEventDate } from '@/helpers/formmatEventDate';
import { isAfter, isEqual, parse, startOfDay } from 'date-fns';
import { avoidRateLimit } from '@/helpers/avoid-rate-limit';

type GetEventsResponse = {
  events: Array<{
    title: string;
    link: string;
    cover: string;
    initialDate: string;
    endDate: string;

    date: string;
  }>
}

const GET_EVENTS_QUERY = gql`
  query Events {
    events(orderBy: initialDate_ASC) {
      title
      cover
      link
      initialDate
      endDate
    }
  }
`

export default function Events({ events }: GetEventsResponse) {
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

      <Header currentPage='events' />

      <main className={styles.events}>
        <section className={styles.events__header}>
          <div>
            <h1>Eventos da Comunidade Plenitude</h1>
          </div>
        </section>

        {!events.length && (<EventsEmptyState />)}

        {!!events.length && (
          <section className={styles.events__list}>
            <h2><span>Confira</span> as novidades</h2>

            <div>
              {events.map(event => (
                <div
                  key={event.title}
                  className={styles.event_card}
                >
                  <div className="">
                    <Image
                      src={event.cover}
                      alt={event.title}
                      width={500}
                      height={500}
                    />
                  </div>

                  <div>
                    <h3>{event.title}</h3>

                    <span>{event.date}</span>

                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Link de inscrição
                    </a>
                  </div>
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

export const getStaticProps: GetStaticProps = async () => {
  await avoidRateLimit()

  const { data } = await client.query<GetEventsResponse>({
    query: GET_EVENTS_QUERY,
  });

  const events = data?.events || [];

  const sanitizedEvents = events
    .filter(event => {
      const date = parse(event.initialDate, 'yyyy-MM-dd', new Date());
      const today = startOfDay(new Date());

      return isEqual(date, today) || isAfter(date, today);
    })
    .map(event => ({
      ...event,
      date: formatEventDate(event.initialDate, event.endDate),
    }));

  return {
    props: {
      events: sanitizedEvents
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
}
