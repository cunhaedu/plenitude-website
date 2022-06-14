import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { ILeaderShip } from '../../interfaces/ILeaderShip';
import Thumbnail from '../Thumbnail';

const leaderShips: ILeaderShip[] = [
  {
    id: 1,
    name: 'Ap. Diego Melo',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/apostolo_diego/01.jpg')]"
  },
  {
    id: 2,
    name: 'Bispa. Patricia Melo',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/bispa_patricia/01.jpg')]"
  },
  {
    id: 3,
    name: 'Pr. Emerson',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/main/pastor_emerson/02.jpg')]"
  },
  {
    id: 4,
    name: 'Ev. Juliana',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/worship/evangelista_juliana/02.jpg')]"
  },
  {
    id: 5,
    name: 'Leandro Santos',
    description: 'Descrição',
    image: "bg-[url('/assets/leadership/consolidation/leandro/01.jpg')]"
  },
]

export function LeaderShipRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  function handleClick(direction: string) {
    setIsMoved(true)
    if (!rowRef.current) {
      return;
    }

    const { scrollLeft, clientWidth } = rowRef.current;

    const scrollTo =
      direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth

    rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }

  return (
    <div className="py-10">
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-4 z-40 m-auto h-8 w-8 cursor-pointer opacity-0 group-hover:opacity-100 bg-black rounded-full text-gray-500 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className="flex items-center overflow-x-scroll scrollbar-hide md:p-1"
          ref={rowRef}
        >
          {leaderShips.map(leader => (
            <Thumbnail key={leader.id} leader={leader} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-4 z-40 m-auto h-8 w-8 cursor-pointer opacity-0 transition group-hover:opacity-100 bg-black rounded-full text-gray-500"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}
