import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
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

import { removeDuplicateKeyInObjectArrayHelper } from '../../../../helpers/removeDuplicateKeyInObjectArray.helper';
import { client } from '../../../../lib/apollo';

type ChurchData = {
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

type GetChurchesResponse = {
  churches: ChurchData[];
}

const GET_CHURCHES_QUERY = gql`
  query Churches {
    churches {
      slug
      name
      city
      state
      street
      number
      district
      serviceTimes
      cover
      cityImageURL
      description
    }
  }
`

export function ChurchManagement() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  let churches: ChurchData[] = [];

  const { data, error } = useSWR(GET_CHURCHES_QUERY, (query) =>
    client.query<GetChurchesResponse>({
      query,
    })
  );

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.data.churches) {
    churches = data.data.churches
  }

  function isLeaderSelected(leader: ChurchData) {
    return selectedCities.includes(leader.city) || selectedCities.length === 0
  }

  return (
    <Card>
      <div className='flex items-center justify-between gap-4'>
        <button className='h-9 py-2 px-4 bg-indigo-500 rounded-md w-24 flex items-center justify-center transition-colors ease-in-out hover:bg-indigo-600'>
          <PlusIcon className='h-6 w-6 text-white text-center' />
        </button>

        <MultiSelectBox
          handleSelect={(value) => setSelectedCities(value)}
          placeholder="Filtrar por cidades"
          maxWidth="max-w-xs"
        >
          {
            removeDuplicateKeyInObjectArrayHelper(churches, 'city')
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
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash className='hover:text-red-500 cursor-pointer' />
                </div>
              </TableCell>
              <TableCell>
                <div className='w-full flex justify-center'>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={church.cityImageURL}
                      alt={church.name}
                      fill
                      className='rounded-full object-cover'
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
