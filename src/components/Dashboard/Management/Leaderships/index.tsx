import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/@ui/table';
import { Card } from '@/components/@ui/card';

type LeadershipData = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  slug: string;
}

const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());

export function LeadershipManagement() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  let leaderships: LeadershipData[] = [];

  const { data, error, mutate } = useSWR(
    '/api/leaderships/list',
    fetcher,
  );

  async function revalidateData(): Promise<void> {
    await mutate('/api/leaderships/list');
  }

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.leaderships) {
    leaderships = data.leaderships
  }

  return (
    <Card>
      <div className='dashboard__card_header'>
        <button className=''>
          <PlusIcon height={24} width={24} />
        </button>

        {/* <MultiSelectBox
          onValueChange={(value) => setSelectedRoles(value)}
          placeholder="Filtrar por cargos"
          className="max-w-xs"
        >
          {removeDuplicateKeyInObjectArrayHelper(leaderships, 'role')
            .map((leader) => (
              <MultiSelectBoxItem
                key={leader.slug}
                value={leader.role}
                text={leader.role}
                className='py-2'
              />
            ))
          }
        </MultiSelectBox> */}
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Avatar</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Cargo</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaderships.filter((leader) =>
            !selectedRoles.length || selectedRoles.includes(leader.role)
          ).map((leader) => (
            <TableRow key={leader.slug}>
              <TableCell>
                <div className='dashboard__action_container'>
                  <FaPen />
                  <FaTrash />
                </div>
              </TableCell>
              <TableCell>
                <Image
                  src={leader.avatar}
                  alt={leader.name}
                  width={64}
                  height={64}
                  className='dashboard__multi_image'
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
    </Card>
  )
}
