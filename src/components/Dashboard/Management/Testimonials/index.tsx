import { PlusIcon } from '@heroicons/react/outline';
import { FaTrash, FaPen } from 'react-icons/fa';
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
import DeleteTestimonialModal from './delete';
import CreateTestimonialModal from './create';
import UpdateTestimonialModal from './update';

type TestimonialData = {
  id: string;
  name: string;
  description: string;
}

const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());

export function TestimonialManagement() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const [selectedTestimonial, setSelectedTestimonial] = useState({} as TestimonialData);
  const [isDeleteTestimonialModalOpen, setIsDeleteTestimonialModalOpen] = useState(false);
  const [isUpdateTestimonialModalOpen, setIsUpdateTestimonialModalOpen] = useState(false);
  const [isCreateTestimonialModalOpen, setIsCreateTestimonialModalOpen] = useState(false);

  let testimonials: TestimonialData[] = [];

  const { data, error, mutate } = useSWR(
    '/api/testimonials/list',
    fetcher,
  );

  async function revalidateData(): Promise<void> {
    await mutate('/api/testimonials/list');
  }

  if (error) {
    return (
      <p className="dashboard__load_data_error">Falha ao carregar os dados</p>
    )
  }

  if(data && data.testimonials) {
    testimonials = data.testimonials
  }

  function closeDeleteTestimonialModal() {
    setIsDeleteTestimonialModalOpen(false);
  }

  function closeCreateTestimonialModal() {
    setIsCreateTestimonialModalOpen(false);
  }

  function closeUpdateTestimonialModal() {
    setIsUpdateTestimonialModalOpen(false);
  }

  function deleteTestimonial(testimonial: TestimonialData) {
    setSelectedTestimonial(testimonial);
    setIsDeleteTestimonialModalOpen(true);
  }

  function updateTestimonial(testimonial: TestimonialData) {
    setSelectedTestimonial(testimonial);
    setIsUpdateTestimonialModalOpen(true);
  }

  function createTestimonial() {
    setIsCreateTestimonialModalOpen(true);
  }

  return (
    <Card>
      <div className="dashboard__card_header">
        <button onClick={() => createTestimonial()}>
          <PlusIcon height={24} width={24} />
        </button>

        <MultiSelectBox
          onValueChange={values => setSelectedNames(values)}
          placeholder="Filtrar pelo nome"
          className='max-w-xs'
        >
          {removeDuplicateKeyInObjectArrayHelper(testimonials, 'name')
            .map((testimonial) => (
              <MultiSelectBoxItem
                key={testimonial.id}
                value={testimonial.name}
                text={testimonial.name}
                className='py-2'
              />
            ))
          }
        </MultiSelectBox>
      </div>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Mensagem</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {testimonials
            .filter((testimonial) =>
              !selectedNames.length || selectedNames.includes(testimonial.name)
            )
            .map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>
                  <div className="dashboard__action_container">
                    <FaPen onClick={() => updateTestimonial(testimonial)} />
                    <FaTrash onClick={() => deleteTestimonial(testimonial)} />
                  </div>
                </TableCell>
                <TableCell>
                  {testimonial.name}
                </TableCell>
                <TableCell>
                  <p className='truncate max-w-[400px]'>
                    {testimonial.description}
                  </p>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <DeleteTestimonialModal
        isOpen={isDeleteTestimonialModalOpen}
        closeModal={closeDeleteTestimonialModal}
        testimonial={selectedTestimonial}
        revalidateData={revalidateData}
      />

      <UpdateTestimonialModal
        isOpen={isUpdateTestimonialModalOpen}
        closeModal={closeUpdateTestimonialModal}
        testimonial={selectedTestimonial}
        revalidateData={revalidateData}
      />

      <CreateTestimonialModal
        isOpen={isCreateTestimonialModalOpen}
        closeModal={closeCreateTestimonialModal}
        revalidateData={revalidateData}
      />
    </Card>
  )
}
