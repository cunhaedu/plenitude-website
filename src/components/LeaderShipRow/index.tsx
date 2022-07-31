import { ILeaderShip } from '../../interfaces/ILeaderShip';
import Thumbnail from '../Thumbnail';

const leaderShips: ILeaderShip[] = [
  {
    id: 1,
    name: 'Ap. Diego Melo',
    description: 'Liderança Sênior',
    image: "bg-[url('/assets/leadership/main/apostolo_diego/01.jpg')]"
  },
  {
    id: 2,
    name: 'Bispa. Patricia Melo',
    description: 'Liderança Sênior',
    image: "bg-[url('/assets/leadership/main/bispa_patricia/01.jpg')]"
  },
  {
    id: 3,
    name: 'Pr. Emerson',
    description: 'Liderança Local',
    image: "bg-[url('/assets/leadership/main/pastor_emerson/02.jpg')]"
  },
  {
    id: 4,
    name: 'Ev. Juliana',
    description: 'Liderança de Adoração',
    image: "bg-[url('/assets/leadership/worship/evangelista_juliana/02.jpg')]"
  },
  {
    id: 5,
    name: 'Leandro Santos',
    description: 'Liderança de Consolidação',
    image: "bg-[url('/assets/leadership/consolidation/leandro/01.jpg')]"
  },
]

export function LeaderShipRow() {
  return (
    <div className="py-10 flex overflow-scroll scrollbar-hide align-middle justify-center">
      <div className="group relative md:-ml-2">
        <div
          className="flex items-center overflow-x-scroll scrollbar-hide md:p-1"
        >
          {leaderShips.map(leader => (
            <Thumbnail key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </div>
  )
}
