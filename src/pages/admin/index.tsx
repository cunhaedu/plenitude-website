import { useState } from 'react';
import Head from 'next/head';
import {
  Card,
  MultiSelectBox,
  MultiSelectBoxItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TabList,
} from '@tremor/react';
import { FaEdit } from 'react-icons/fa';

import { ILeaderShip } from '../../interfaces/ILeaderShip';
import { leaderShips } from '../../data/leadership';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

type TabViews = 'leadership' | 'churches';

export default function Admin() {
  const [selectedView, setSelectedView] = useState<TabViews>('leadership');

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  function isLeaderSelected(leader: ILeaderShip) {
    return selectedNames.includes(leader.description) || selectedNames.length === 0
  }

  return (
    <>
      <Head>
        <title>ADM</title>
      </Head>

      <Header />

      <main className="max-w-2xl mx-auto py-24 px-4 md:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Bem vindo
        </h1>

        <p className='pb-10 text-gray-500 font-medium'>
          Administre por aqui as informações do site
        </p>

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
          <Tab value="services" text="Horários dos cultos" />
        </TabList>

        <div className='mt-3'>
          { selectedView === 'leadership' && (
            <Card>
              <MultiSelectBox
                handleSelect={ (value) => setSelectedNames(value) }
                placeholder="Filtrar por cargos"
                maxWidth="max-w-xs"
              >
                {leaderShips.map((leader) => (
                    <MultiSelectBoxItem
                      key={ leader.slug }
                      value={ leader.description }
                      text={ leader.description }
                    />
                  ))
                }
              </MultiSelectBox>
              <Table marginTop="mt-6">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Ações</TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">Nome</TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">Cargo</TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {leaderShips.filter((leader) => isLeaderSelected(leader)).map((leader) => (
                    <TableRow key={ leader.slug }>
                      <TableCell textAlignment="text-right"><FaEdit /></TableCell>
                      <TableCell textAlignment="text-right">{ leader.name }</TableCell>
                      <TableCell textAlignment="text-right">{ leader.description }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
