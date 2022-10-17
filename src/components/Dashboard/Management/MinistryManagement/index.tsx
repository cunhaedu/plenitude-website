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

type MinistryData = {
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
    slug: string;
    name: string;
    avatar: string;
  }>;
}

type GetMinistriesResponse = {
  ministries: MinistryData[];
}

const GET_MINISTRIES_QUERY = gql`
  query Ministries {
    ministries {
      name
      description
      slug
      cover
      video
      book
      phrase
      chapter
      verseNumber
      mainColor
      leaderships {
        slug
        name
        avatar
      }
    }
  }
`

export function MinistryManagement() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  let ministries: MinistryData[] = [];

  const { data, error } = useSWR(GET_MINISTRIES_QUERY, (query) =>
    client.query<GetMinistriesResponse>({
      query,
    })
  );

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.data.ministries) {
    ministries = data.data.ministries
  }

  function isLeaderSelected(ministry: MinistryData) {
    return selectedNames.includes(ministry.name) || selectedNames.length === 0
  }

  return (
    <Card>
      <div className='flex items-center justify-between gap-4'>
        <button className='h-9 py-2 px-4 bg-indigo-500 rounded-md w-24 flex items-center justify-center transition-colors ease-in-out hover:bg-indigo-600'>
          <PlusIcon className='h-6 w-6 text-white text-center' />
        </button>

        <MultiSelectBox
          handleSelect={(value) => setSelectedNames(value)}
          placeholder="Filtrar pelo nome da rede"
          maxWidth="max-w-xs"
        >
          {
            removeDuplicateKeyInObjectArrayHelper(ministries, 'name')
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
            <TableHeaderCell textAlignment='text-center'>Imagem</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Liderança</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ministries.filter((ministry) => isLeaderSelected(ministry)).map((ministry) => (
            <TableRow key={ministry.slug}>
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
                      src={ministry.cover}
                      alt={ministry.name}
                      fill
                      className='rounded-full object-cover'
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {ministry.name}
              </TableCell>
              <TableCell>
              <div className="flex -space-x-4 overflow-hidden">
                {ministry.leaderships.map(leader => (
                  <Image
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white object-cover"
                    src={leader.avatar}
                    alt={leader.name}
                    width={144}
                    height={144}
                    key={leader.slug}
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
