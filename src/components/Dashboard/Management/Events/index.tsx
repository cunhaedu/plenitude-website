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
import DeleteEventModal from './delete';
import CreateEventModal from './create';
import UpdateEventModal from './update';
import { format } from 'date-fns';
import Image from 'next/image';
import { DashboardImage } from '@/components/DashboardImage';

type EventData = {
  id: string;
  title: string;
  initialDate: string;
  endDate: string;
  cover: string;
}

const fetcher = (args: RequestInfo) => fetch(args).then((res) => res.json());

export function EventsManagement() {
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const [selectedEvent, setSelectedEvent] = useState({} as EventData);
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
  const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  let events: EventData[] = [];

  const { data, error, mutate } = useSWR(
    '/api/events/list',
    fetcher,
  );

  async function revalidateData(): Promise<void> {
    await mutate('/api/events/list');
  }

  if (error) {
    return (
      <p className="dashboard__load_data_error">Falha ao carregar os dados</p>
    )
  }

  if(data && data.events) {
    events = data.events
  }

  function closeDeleteEventModal() {
    setIsDeleteEventModalOpen(false);
  }

  function closeCreateEventModal() {
    setIsCreateEventModalOpen(false);
  }

  function closeUpdateEventModal() {
    setIsUpdateEventModalOpen(false);
  }

  function deleteEvent(event: EventData) {
    setSelectedEvent(event);
    setIsDeleteEventModalOpen(true);
  }

  function updateEvent(event: EventData) {
    setSelectedEvent(event);
    setIsUpdateEventModalOpen(true);
  }

  function createEvent() {
    setIsCreateEventModalOpen(true);
  }

  return (
    <Card>
      <div className="dashboard__card_header">
        <button onClick={() => createEvent()}>
          <PlusIcon height={24} width={24} />
        </button>

        <MultiSelectBox
          handleSelect={values => setSelectedTitles(values)}
          placeholder="Filtrar pelo titulo"
          maxWidth="max-w-xs"
        >
          {removeDuplicateKeyInObjectArrayHelper(events, 'title')
            .map((event) => (
              <MultiSelectBoxItem
                key={event.id}
                value={event.title}
                text={event.title}
              />
            ))
          }
        </MultiSelectBox>
      </div>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Imagem</TableHeaderCell>
            <TableHeaderCell>Título</TableHeaderCell>
            <TableHeaderCell>Data de início</TableHeaderCell>
            <TableHeaderCell>Data de fim</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events
            .filter((event) =>
              !selectedTitles.length || selectedTitles.includes(event.title)
            )
            .map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="dashboard__action_container">
                    <FaPen onClick={() => updateEvent(event)} />
                    <FaTrash onClick={() => deleteEvent(event)} />
                  </div>
                </TableCell>
                <TableCell>
                  <DashboardImage alt={event.title} url={event.cover} />
                </TableCell>
                <TableCell>
                  {event.title}
                </TableCell>
                <TableCell>
                  {format(new Date(event.initialDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(event.endDate), 'dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      {/* <DeleteEventModal
        isOpen={isDeleteEventModalOpen}
        closeModal={closeDeleteEventModal}
        event={selectedEvent}
        revalidateData={revalidateData}
      />

      <UpdateEventModal
        isOpen={isUpdateEventModalOpen}
        closeModal={closeUpdateEventModal}
        event={selectedEvent}
        revalidateData={revalidateData}
      /> */}

      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        closeModal={closeCreateEventModal}
        revalidateData={revalidateData}
      />
    </Card>
  )
}
