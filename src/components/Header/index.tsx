import { Fragment } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { MenuAlt4Icon, XIcon } from '@heroicons/react/outline';

interface IHeaderProps {
  currentPage?: 'home' | 'about' | 'churches' | 'events' | 'ministries';
}

export function Header({ currentPage }: IHeaderProps) {
  return (
    <Popover className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-400/30 flex justify-between items-center py-2 px-5 md:px-24 lg:px-36">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/">
          <a>
            <span className="sr-only">Comunidade Plenitude</span>
            <img
              className="h-14 w-auto md:h-14 rounded-full"
              src="/assets/logo/full.jpg"
              alt="Comunidade Plenitude"
            />
          </a>
        </Link>
      </div>
      <div className="-mr-2 -my-2 md:hidden">
        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open menu</span>
          <MenuAlt4Icon className="h-6 w-6" aria-hidden="true" />
        </Popover.Button>
      </div>
      <Popover.Group as="nav" className="hidden md:flex space-x-10 text-center self-center">
        <Link href='/' >
          <a className="text-base font-medium text-gray-500 hover:text-black self-center">
            <span className={currentPage === 'home' ? 'text-black' : ''}>
              Inicio
            </span>
          </a>
        </Link>

        <Link href='/about'>
          <a className="font-medium text-gray-500 hover:text-black self-center">
            <span className={currentPage === 'about' ? 'text-black' : ''}>
              Sobre
            </span>
          </a>
        </Link>

        <Link href='/ministries'>
          <a className="text-base font-medium text-gray-500 hover:text-black self-center">
            <span className={currentPage === 'ministries' ? 'text-black' : ''}>
              Redes
            </span>
          </a>
        </Link>

        <Link href='/churches'>
          <a className="text-base font-medium text-gray-500 hover:text-black self-center">
            <span className={currentPage === 'churches' ? 'text-black' : ''}>
              Igrejas
            </span>
          </a>
        </Link>

        <Link href="/login">
          <a className="self-center border border-gray-500 py-1 px-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-500 transition duration-300 ease-in-out">
            Login
          </a>
        </Link>
      </Popover.Group>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 bg-white">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-14 w-auto md:h-10 rounded-full"
                    src="/assets/logo/full.jpg"
                    alt="Comunidade Plenitude"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link href='/' >
                  <a className="text-base font-medium text-gray-500">
                    <span className={currentPage === 'home' ? 'text-black' : ''}>
                      Inicio
                    </span>
                  </a>
                </Link>

                <Link href='/about'>
                  <a href="#" className="text-base font-medium text-gray-500">
                    <span className={currentPage === 'about' ? 'text-black' : ''}>
                      Sobre
                    </span>
                  </a>
                </Link>

                <Link href='/churches'>
                  <a className="text-base font-medium text-gray-500">
                    <span className={currentPage === 'churches' ? 'text-black' : ''}>
                      Igrejas
                    </span>
                  </a>
                </Link>

                <Link href='/ministries'>
                  <a className="text-base font-medium text-gray-500">
                    <span className={currentPage === 'ministries' ? 'text-black' : ''}>
                      Redes
                    </span>
                  </a>
                </Link>
              </div>

              <div>
                <Link href="/login">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Login
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
