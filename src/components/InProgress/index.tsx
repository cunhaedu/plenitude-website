import Image from 'next/image';
import Link from 'next/link';

export default function InProgress() {
  return (
    <main className='flex flex-col justify-center h-screen align-middle p-10' >
      <Image
        src='/assets/illustrations/building.svg'
        alt='building'
        width={250}
        height={250}
      />

      <h2 className='text-center font-semibold py-10'>
        Sentimos muito, parece que esta parte do site está em construção, <br/>
        mas não se preocupe, logo logo ela será disponibilizada por aqui
      </h2>

      <Link href="/">
        <a className='no-underline py-5 bg-indigo-500 transition duration-200 ease-in-out text-white hover:bg-indigo-700 text-center w-32 self-center rounded-md'>
          Voltar ao início
        </a>
      </Link>
    </main>
  )
}
