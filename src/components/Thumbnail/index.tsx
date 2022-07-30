import { ILeaderShip } from '../../interfaces/ILeaderShip';

interface Props {
  leader: ILeaderShip;
}

export default function Thumbnail({ leader }: Props) {
  return (
      <div className={`${leader.image} bg-no-repeat bg-cover bg-center rounded-md mx-2 cursor-pointer duration-200`}>
        <div className='h-80 w-64 flex flex-col bg-gradient-to-t from-[#0a0a0a] hover:from-black rounded-md'>
          <span className='mt-60 text-white font-bold pl-5'>{leader.name}</span>
          <span className='text-white pl-5'>{leader.description}</span>
        </div>
      </div>
  )
}
