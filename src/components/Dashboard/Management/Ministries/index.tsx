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

import { DashboardImage } from '@/components/DashboardImage';

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

  const [selectedMinistry, setSelectedMinistry] = useState({} as MinistryData);
  const [isDeleteMinistryModalOpen, setIsDeleteMinistryModalOpen] = useState(false);
  const [isUpdateMinistryModalOpen, setIsUpdateMinistryModalOpen] = useState(false);
  const [isCreateMinistryModalOpen, setIsCreateMinistryModalOpen] = useState(false);

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

  function closeDeleteMinistryModal() {
    setIsDeleteMinistryModalOpen(false);
  }

  function closeCreateMinistryModal() {
    setIsCreateMinistryModalOpen(false);
  }

  function closeUpdateMinistryModal() {
    setIsUpdateMinistryModalOpen(false);
  }

  function deleteMinistry(ministry: MinistryData) {
    setSelectedMinistry(ministry);
    setIsDeleteMinistryModalOpen(true);
  }

  function updateMinistry(ministry: MinistryData) {
    setSelectedMinistry(ministry);
    setIsUpdateMinistryModalOpen(true);
  }

  function createMinistry() {
    setIsCreateMinistryModalOpen(true);
  }

  function isLeaderSelected(ministry: MinistryData) {
    return selectedNames.includes(ministry.name) || selectedNames.length === 0
  }

  return (
    <Card>
      <div className="dashboard__card_header">
        <button onClick={() => createMinistry()}>
          <PlusIcon height={24} width={24} />
        </button>

        {/* <MultiSelectBox
          onValueChange={(value) => setSelectedNames(value)}
          placeholder="Filtrar pelo nome da rede"
          className="max-w-xs"
        >
          {removeDuplicateKeyInObjectArrayHelper(ministries, 'name')
            .map((leader) => (
              <MultiSelectBoxItem
                key={leader.slug}
                value={leader.name}
                text={leader.name}
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
            <TableHeaderCell className='text-center'>
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
                  <FaPen onClick={() => updateMinistry(ministry)} />
                  <FaTrash onClick={() => deleteMinistry(ministry)} />
                </div>
              </TableCell>
              <TableCell>
                <DashboardImage alt={ministry.name} url={ministry.cover} />
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

      {/* <DeleteTestimonialModal
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
      /> */}

      {/* <CreateMinistryModal
        isOpen={isCreateMinistryModalOpen}
        closeModal={closeCreateMinistryModal}
        revalidateData={revalidateData}
      /> */}
    </Card>
  )
}
