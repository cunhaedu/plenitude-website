import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
import Image from 'next/future/image';
import { useState } from 'react';
import useSWR from 'swr';
import {
  Card,
  MultiSelectBox,
  MultiSelectBoxItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

import { removeDuplicateKeyInObjectArrayHelper } from '@/helpers/removeDuplicateKeyInObjectArray.helper';

type ChurchData = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  street: string;
  number: string;
  district: string;
  serviceTimes: string;
  cover: string;
  cityImageURL: string;
  description: string;
}

const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());

export function ChurchManagement() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  let churches: ChurchData[] = [];

  const { data, error, mutate } = useSWR(
    '/api/churches/list',
    fetcher,
  );

  async function revalidateData(): Promise<void> {
    await mutate('/api/churches/list');
  }

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.churches) {
    churches = data.churches
  }

  function isLeaderSelected(leader: ChurchData) {
    return selectedCities.includes(leader.city) || selectedCities.length === 0
  }

  return (
    <Card>
      <div className="dashboard__card_header">
        <button>
          <PlusIcon height={24} width={24} />
        </button>

        <MultiSelectBox
          handleSelect={(value) => setSelectedCities(value)}
          placeholder="Filtrar por cidades"
          maxWidth="max-w-xs"
        >
          {removeDuplicateKeyInObjectArrayHelper(churches, 'city')
            .map((leader) => (
              <MultiSelectBoxItem
                key={ leader.slug }
                value={ leader.city }
                text={ leader.city }
              />
            ))
          }
        </MultiSelectBox>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Imagem da Cidade</TableHeaderCell>
            <TableHeaderCell>Nome da Igreja</TableHeaderCell>
            <TableHeaderCell>Cidade</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Endereço</TableHeaderCell>
            <TableHeaderCell>Bairro</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {churches.filter((church) => isLeaderSelected(church)).map((church) => (
            <TableRow key={church.slug}>
              <TableCell>
                <div className="dashboard__action_container">
                  <FaPen />
                  <FaTrash />
                </div>
              </TableCell>
              <TableCell>
                <div className='dashboard__image_container'>
                  <div>
                    <Image
                      src={church.cityImageURL}
                      alt={church.name}
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {church.name}
              </TableCell>
              <TableCell>
                {church.city}
              </TableCell>
              <TableCell>
                {church.state}
              </TableCell>
              <TableCell>
                {`${church.street}, ${church.number}`}
              </TableCell>
              <TableCell>
                {church.district}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
