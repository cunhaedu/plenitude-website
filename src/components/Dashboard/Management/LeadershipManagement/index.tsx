import { FaTrash, FaPen } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/future/image';
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

import { gql } from '@apollo/client';
import { client } from '../../../../lib/apollo';
import { removeDuplicateKeyInObjectArrayHelper } from '../../../../helpers/removeDuplicateKeyInObjectArray.helper';

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
