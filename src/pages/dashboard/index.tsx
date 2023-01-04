import { Slide, ToastContainer } from 'react-toastify';
import { LogoutIcon } from '@heroicons/react/outline';
import { Tab, TabList } from '@tremor/react';
import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Head from 'next/head';

import { TestimonialManagement } from '@/components/Dashboard/Management/Testimonials';
import { LeadershipManagement } from '@/components/Dashboard/Management/Leaderships';
import { MinistryManagement } from '@/components/Dashboard/Management/Ministries';
import { ChurchManagement } from '@/components/Dashboard/Management/Churches';
import { AuthContext } from '@/contexts/AuthContext';
import { Banner } from '@/components/Banner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import styles from './styles.module.scss';

type TabViews = 'leadership' | 'churches' | 'ministries' | 'testimonies';

export default function Admin() {
  const [selectedView, setSelectedView] = useState<TabViews>('leadership');
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

        <div className={styles.dashboard_tab_container}>
          <TabList
            color='indigo'
            defaultValue="leadership"
            handleSelect={ (value) => setSelectedView(value) }
            marginTop="mt-2"
          >
            <Tab value="leadership" text="Liderança" />
            <Tab value="churches" text="Igrejas" />
            <Tab value="ministries" text="Redes" />
            <Tab value="testimonies" text="Testemunhos" />
          </TabList>
        </div>

        {selectedView === 'leadership' &&  <LeadershipManagement />}
        {selectedView === 'churches' &&  <ChurchManagement />}
        {selectedView === 'ministries' &&  <MinistryManagement />}
        {selectedView === 'testimonies' &&  <TestimonialManagement />}
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
