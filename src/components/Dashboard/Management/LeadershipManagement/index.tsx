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

type LeadershipData = {
  name: string;
  bio: string;
  avatar: string;
  role: string;
  slug: string;
}

type GetLeadershipsResponse = {
  leaderships: LeadershipData[];
}

const GET_LEADERSHIPS_QUERY = gql`
  query Leaderships {
    leaderships {
      name
      bio
      avatar
      role
      instagram
    }
  }
`

export function LeadershipManagement() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  let leaderships: LeadershipData[] = [];

  const { data, error } = useSWR(GET_LEADERSHIPS_QUERY, (query) =>
    client.query<GetLeadershipsResponse>({
      query,
    })
  );

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.data.leaderships) {
    leaderships = data.data.leaderships
  }

  function isLeaderSelected(leader: LeadershipData) {
    return selectedRoles.includes(leader.role) || selectedRoles.length === 0
  }

  return (
    <Card>
      <div className='flex items-center justify-between gap-4'>
        <button className='h-9 py-2 px-4 bg-indigo-500 rounded-md w-24 flex items-center justify-center transition-colors ease-in-out hover:bg-indigo-600'>
          <PlusIcon className='h-6 w-6 text-white text-center' />
        </button>

        <MultiSelectBox
          handleSelect={(value) => setSelectedRoles(value)}
          placeholder="Filtrar por cargos"
          maxWidth="max-w-xs"
        >
          {
            removeDuplicateKeyInObjectArrayHelper(leaderships, 'role')
              .map((leader) => (
                <MultiSelectBoxItem
                  key={ leader.slug }
                  value={ leader.role }
                  text={ leader.role }
                />
              ))
          }
        </MultiSelectBox>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Avatar</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Cargo</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaderships.filter((leader) => isLeaderSelected(leader)).map((leader) => (
            <TableRow key={leader.slug}>
              <TableCell>
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash className='hover:text-red-500 cursor-pointer' />
                </div>
              </TableCell>
              <TableCell>
                  <div className='w-16 h-16 relative'>
                    <Image
                      src={leader.avatar}
                      alt='unknown'
                      fill
                      className='rounded-full object-cover'
                    />
                  </div>
              </TableCell>
              <TableCell>
                {leader.name}
              </TableCell>
              <TableCell>
                {leader.role}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}