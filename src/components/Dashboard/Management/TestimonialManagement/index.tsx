import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
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
import DeleteTestimonialModal from './delete';

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
  const [filteredTestimonials, setFilteredTestimonials] = useState<TestimonialData[]>([]);
  const [currentTestimonials, setCurrentTestimonials] = useState<TestimonialData[]>([]);

  const [testimonialsOffset, setTestimonialsOffset] = useState(0);

  const [selectedTestimonial, setSelectedTestimonial] = useState({} as TestimonialData);
  const [isDeleteTestimonialModalOpen, setIsDeleteTestimonialModalOpen] = useState(false);

  useEffect(() => {
    setFilteredTestimonials(currentTestimonials);
  }, [currentTestimonials]);

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

  function closeDeleteTestimonialModal() {
    setIsDeleteTestimonialModalOpen(false);
  }

  function deleteTestimonial(testimonial: TestimonialData) {
    setSelectedTestimonial(testimonial);
    setIsDeleteTestimonialModalOpen(true);
  }

  function filterTestimonials(values: string[]) {
    setSelectedNames(values)

    if (!values.length) {
      setFilteredTestimonials(currentTestimonials)
    } else {
      setFilteredTestimonials(testimonials.filter(e => values.includes(e.name)));
    }
  }

  function isLeaderSelected(testimonial: TestimonialData) {
    return selectedNames.includes(testimonial.name) || selectedNames.length === 0
  }

  return (
    <Card>
      <div className='flex items-center justify-between gap-4 z-50'>
        <button className='h-9 py-2 px-4 bg-indigo-500 rounded-md w-24 flex items-center justify-center transition-colors ease-in-out hover:bg-indigo-600'>
          <PlusIcon className='h-6 w-6 text-white text-center' />
        </button>

        <MultiSelectBox
          handleSelect={values => filterTestimonials(values)}
          placeholder="Filtrar pelo nome"
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
          {filteredTestimonials
            .filter((testimonial) => isLeaderSelected(testimonial))
            .map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell>
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash
                    onClick={() => deleteTestimonial(testimonial)}
                    className='hover:text-red-500 cursor-pointer'
                  />
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

      <Paginator
        currentItems={currentTestimonials}
        items={testimonials}
        itemsOffset={testimonialsOffset}
        setItemsOffset={setTestimonialsOffset}
        setCurrentItems={setCurrentTestimonials}
      />


      <DeleteTestimonialModal
        isOpen={isDeleteTestimonialModalOpen}
        closeModal={closeDeleteTestimonialModal}
        testimonial={selectedTestimonial}
      />
    </Card>
  )
}
