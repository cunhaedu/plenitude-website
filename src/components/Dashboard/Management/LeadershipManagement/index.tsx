import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
import Image from 'next/future/image';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
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
import { Paginator } from '../../../Paginator';

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
  const [filteredLeadership, setFilteredLeadership] = useState<LeadershipData[]>([]);
  const [currentLeadership, setCurrentLeadership] = useState<LeadershipData[]>([]);

  const [leadershipOffset, setLeadershipOffset] = useState(0);

  useEffect(() => {
    setFilteredLeadership(currentLeadership);
  }, [currentLeadership]);

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

  function filterLeaderships(values: string[]) {
    setSelectedRoles(values)

    if (!values.length) {
      setFilteredLeadership(currentLeadership)
    } else {
      setFilteredLeadership(leaderships.filter(e => values.includes(e.role)));
    }
  }

  return (
    <Card>
      <div className='flex items-center justify-between gap-4'>
        <button className='h-9 py-2 px-4 bg-indigo-500 rounded-md w-24 flex items-center justify-center transition-colors ease-in-out hover:bg-indigo-600'>
          <PlusIcon className='h-6 w-6 text-white text-center' />
        </button>

        <MultiSelectBox
          handleSelect={(value) => filterLeaderships(value)}
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
          {filteredLeadership.filter((leader) => isLeaderSelected(leader)).map((leader) => (
            <TableRow key={leader.slug}>
              <TableCell>
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash className='hover:text-red-500 cursor-pointer' />
                </div>
              </TableCell>
              <TableCell>
                <Image
                  src={leader.avatar}
                  alt={leader.name}
                  width={64}
                  height={64}
                  className='rounded-full object-cover h-16 w-16 min-h-[64px] min-w-[64px]'
                />
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

      <Paginator
        currentItems={currentLeadership}
        items={leaderships}
        itemsOffset={leadershipOffset}
        setItemsOffset={setLeadershipOffset}
        setCurrentItems={setCurrentLeadership}
      />
    </Card>
  )
}
