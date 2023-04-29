import { PlusIcon, StatusOfflineIcon } from '@heroicons/react/outline';
import { StatusOnlineIcon } from '@heroicons/react/solid';
import { FaTrash, FaPen } from 'react-icons/fa';
import { format } from 'date-fns';
import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import {
  Badge,
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
import DeleteEventModal from './modals/delete';
import CreateEventModal from './modals/create';
import UpdateEventModal from './modals/update';

type EventData = {
  id: string;
  title: string;
  initialDate: string;
  endDate: string;
  cover: string;
  link: string;
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
          onValueChange={values => setSelectedTitles(values)}
          placeholder="Filtrar pelo titulo"
          className='max-w-xs'
        >
          {removeDuplicateKeyInObjectArrayHelper(events, 'title')
            .map((event) => (
              <MultiSelectBoxItem
                key={event.id}
                value={event.title}
                text={event.title}
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
            <TableHeaderCell>Imagem</TableHeaderCell>
            <TableHeaderCell>Título</TableHeaderCell>
            <TableHeaderCell>Data de início</TableHeaderCell>
            <TableHeaderCell>Data de fim</TableHeaderCell>
            <TableHeaderCell>Status no site</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events
            .filter((event) =>
              !selectedTitles.length || selectedTitles.includes(event.title)
            )
            .map((event) => {
              const isEventActive = new Date(event.endDate) > new Date();

              return (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="dashboard__action_container">
                      <FaPen onClick={() => updateEvent(event)} />
                      <FaTrash onClick={() => deleteEvent(event)} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={event.cover}
                      alt={event.title}
                      width={64}
                      height={64}
                      className='dashboard__multi_image'
                    />
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
                  <TableCell>
                    <Badge
                      color={isEventActive ? "emerald" : "red"}
                      icon={isEventActive ? StatusOnlineIcon : StatusOfflineIcon}
                      size="md"
                    >
                      {isEventActive ? 'Habilitado' : 'Desabilitado'}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            }
          )}
        </TableBody>
      </Table>

      {!!selectedEvent.title && (
        <>
          {/* <pre>{JSON.stringify(selectedEvent)}</pre> */}
          <UpdateEventModal
            isOpen={isUpdateEventModalOpen}
            closeModal={closeUpdateEventModal}
            event={selectedEvent}
            revalidateData={revalidateData}
          />

          <DeleteEventModal
            isOpen={isDeleteEventModalOpen}
            closeModal={closeDeleteEventModal}
            event={selectedEvent}
            revalidateData={revalidateData}
          />
        </>
      )}

      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        closeModal={closeCreateEventModal}
        revalidateData={revalidateData}
      />
    </Card>
  )
}
