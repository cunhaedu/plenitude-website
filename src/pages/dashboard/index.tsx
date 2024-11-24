import { Slide, ToastContainer } from 'react-toastify';
import { LogoutIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Head from 'next/head';

import { TestimonialManagement } from '@/components/Dashboard/Management/Testimonials';
import { LeadershipManagement } from '@/components/Dashboard/Management/Leaderships';
import { MinistryManagement } from '@/components/Dashboard/Management/Ministries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/@ui/tab';
import { ChurchManagement } from '@/components/Dashboard/Management/Churches';
import { EventsManagement } from '@/components/Dashboard/Management/Events';
import { AuthContext } from '@/contexts/AuthContext';
import { Banner } from '@/components/Banner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import styles from './styles.module.scss';

type TabViews =
  'leadership'
  | 'churches'
  | 'ministries'
  | 'testimonies'
  | 'events';

export default function Admin() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Dashboard | Comunidade Plenitude</title>
      </Head>

      <Header currentPage='adm' />

      <Banner
        text={{
          sm: 'Esta área está em desenvolvimento',
          lg: 'Esta area ainda está sendo desenvolvida, por isso ainda não é possível realizar cadastros',
        }}
      />

      <main className={styles.dashboard_container}>
        <section className={styles.dashboard_header}>
          <div>
            <h1>Bem vindo</h1>
            <p>Administre por aqui as informações do site</p>
          </div>

          <div>
            <button className='group' onClick={logout}>
              <LogoutIcon className='group-hover:text-rose-600' />
            </button>
          </div>
        </section>

        <Tabs defaultValue="events">
          <div className={styles.dashboard_tab_container}>
            <TabsList
              variant="solid"
              color="indigo"
              className="mt-2"
            >
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="testimonies">Testemunhos</TabsTrigger>
              <TabsTrigger value="ministries">Redes</TabsTrigger>
              <TabsTrigger value="churches">Igrejas</TabsTrigger>
              <TabsTrigger value="leadership">Liderança</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="events">
            <EventsManagement />
          </TabsContent>

          <TabsContent value="testimonies">
            <TestimonialManagement />
          </TabsContent>

          <TabsContent value="ministries">
            <MinistryManagement />
          </TabsContent>

          <TabsContent value="churches">
            <ChurchManagement />
          </TabsContent>

          <TabsContent value="leadership">
            <LeadershipManagement />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <ToastContainer
        position='bottom-right'
        transition={Slide}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@plenitude-token']: token } = parseCookies(ctx);

  if(!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}
