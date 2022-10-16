import { LogoutIcon } from '@heroicons/react/outline';
import { Tab, TabList } from '@tremor/react';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import Head from 'next/head';

import { LeadershipManagement } from '../../components/Dashboard/Management/LeadershipManagement';
import { NotImplementedBanner } from '../../components/Banners/NotImplementedBanner';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { GetServerSideProps } from 'next';
import { AuthContext } from '../../contexts/AuthContext';

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

      <NotImplementedBanner />

      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <section className='flex items-center justify-between pb-10'>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Bem vindo
            </h1>

            <p className='text-gray-500 font-medium'>
              Administre por aqui as informações do site
            </p>
          </div>

          <div className='w-32 flex items-center justify-center'>
            <button className='p-3 group' onClick={logout}>
              <LogoutIcon className='w-8 h-8 text-rose-500 group-hover:text-rose-600' />
            </button>
          </div>
        </section>

        <div className='mb-3 overflow-x-auto'>
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
      </main>

      <Footer />
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
