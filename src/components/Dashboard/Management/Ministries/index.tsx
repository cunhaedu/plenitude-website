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

type MinistryData = {
  id: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  video: string;
  book: string;
  phrase: string;
  chapter: string;
  verseNumber: string;
  mainColor: string;
  leaderships: Array<{
    id: string;
    slug: string;
    name: string;
    avatar: string;
  }>;
}

const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());

export function MinistryManagement() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  let ministries: MinistryData[] = [];

  const { data, error, mutate } = useSWR(
    '/api/ministries/list',
    fetcher,
  );

  async function revalidateData(): Promise<void> {
    await mutate('/api/ministries/list');
  }

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.ministries) {
    ministries = data.ministries
  }

  function isLeaderSelected(ministry: MinistryData) {
    return selectedNames.includes(ministry.name) || selectedNames.length === 0
  }

  return (
    <Card>
      <div className="dashboard__card_header">
        <button>
          <PlusIcon height={24} width={24} />
        </button>

        <MultiSelectBox
          handleSelect={(value) => setSelectedNames(value)}
          placeholder="Filtrar pelo nome da rede"
          maxWidth="max-w-xs"
        >
          {removeDuplicateKeyInObjectArrayHelper(ministries, 'name')
            .map((leader) => (
              <MultiSelectBoxItem
                key={ leader.slug }
                value={ leader.name }
                text={ leader.name }
              />
            ))
          }
        </MultiSelectBox>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell textAlignment='text-center'>
              Imagem
            </TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Liderança</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ministries.filter((ministry) => isLeaderSelected(ministry)).map((ministry) => (
            <TableRow key={ministry.slug}>
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
                      src={ministry.cover}
                      alt={ministry.name}
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {ministry.name}
              </TableCell>
              <TableCell>
                <div className="dashboard__multi_image_container">
                  {ministry.leaderships.map(leader => (
                    <Image
                      key={leader.slug}
                      src={leader.avatar}
                      alt={leader.name}
                      width={144}
                      height={144}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
