import { FaTrash, FaPen } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
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

import { ILeaderShip } from '../../../../interfaces/ILeaderShip';
import { leaderShips } from '../../../../data/leadership';

export function LeadershipManagement() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  function isLeaderSelected(leader: ILeaderShip) {
    return selectedNames.includes(leader.description) || selectedNames.length === 0
  }

  return (
    <Card>
      <MultiSelectBox
        handleSelect={ (value) => setSelectedNames(value) }
        placeholder="Filtrar por cargos"
        maxWidth="max-w-xs"
      >
        {leaderShips.map((leader) => (
            <MultiSelectBoxItem
              key={ leader.slug }
              value={ leader.description }
              text={ leader.description }
            />
          ))
        }
      </MultiSelectBox>
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
          {leaderShips.filter((leader) => isLeaderSelected(leader)).map((leader) => (
            <TableRow key={ leader.slug }>
              <TableCell>
                <div className='flex items-center gap-8'>
                  <FaPen className='hover:text-emerald-500 cursor-pointer' />
                  <FaTrash className='hover:text-red-500 cursor-pointer' />
                </div>
              </TableCell>
              <TableCell>
                <Image
                  src='/assets/leadership/unknown.webp'
                  alt='unknown'
                  width={32}
                  height={32}
                  className='rounded-full'
                />
              </TableCell>
              <TableCell>
                {leader.name}
              </TableCell>
              <TableCell>
                {leader.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
