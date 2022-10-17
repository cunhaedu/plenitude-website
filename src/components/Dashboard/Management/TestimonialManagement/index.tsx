import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
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

type TestimonialData = {
  id: string;
  name: string;
  description: string;
}

type GetTestimonialsResponse = {
  testimonials: TestimonialData[];
}

const GET_TESTIMONIALS_QUERY = gql`
  query Testimonials {
    testimonials {
      id
      name
      description
    }
  }
`

export function TestimonialManagement() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  let testimonials: TestimonialData[] = [];

  const { data, error } = useSWR(GET_TESTIMONIALS_QUERY, (query) =>
    client.query<GetTestimonialsResponse>({
      query,
    })
  );

  if (error) {
    return (
      <p className='text-gray-500 text-center py-20'>Falha ao carregar os dados</p>
    )
  }

  if(data && data.data.testimonials) {
    testimonials = data.data.testimonials
  }

  function isLeaderSelected(testimonial: TestimonialData) {
    return selectedNames.includes(testimonial.name) || selectedNames.length === 0
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
            removeDuplicateKeyInObjectArrayHelper(testimonials, 'name')
              .map((testimonial) => (
                <MultiSelectBoxItem
                  key={ testimonial.id }
                  value={ testimonial.name }
                  text={ testimonial.name }
                />
              ))
          }
        </MultiSelectBox>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Mensagem</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {testimonials.filter((testimonial) => isLeaderSelected(testimonial)).map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell>
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash className='hover:text-red-500 cursor-pointer' />
                </div>
              </TableCell>
              <TableCell>
                {testimonial.name}
              </TableCell>
              <TableCell>
                <p className='truncate max-w-[400px]'>{testimonial.description}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
