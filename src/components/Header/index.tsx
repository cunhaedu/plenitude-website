import { Fragment } from 'react';
import Link from 'next/link';
import { GiTeacher } from 'react-icons/gi';
import { ImMan, ImWoman } from 'react-icons/im';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  MenuAlt4Icon,
  RefreshIcon,
  XIcon
} from '@heroicons/react/outline';
import {
  FaChild,
  FaCompactDisc,
  FaHeart,
  FaPlaceOfWorship
} from 'react-icons/fa';

interface IHeaderProps {
  currentPage: 'home' | 'about' | 'churches' | 'events' | 'ministries';
}

const ministries = [
  {
    name: 'Rede pastoral',
    href: '/ministries/shepherds',
    icon: FaPlaceOfWorship,
  },
  {
    name: 'Rede de ensino',
    href: '/ministries/teaching',
    icon: GiTeacher,
  },
  {
    name: 'Rede de Adoração',
    href: '/ministries/worship',
    icon: FaCompactDisc
  },
  {
    name: 'Rede de Casais',
    href: '/ministries/couples',
    icon: FaHeart
  },
  {
    name: 'Rede de Homens',
    href: '/ministries/men',
    icon: ImMan,
  },
  {
    name: 'Rede de Mulheres',
    href: '/ministries/women',
    icon: ImWoman,
  },
  {
    name: 'Rede de Jovens',
    href: '/ministries/young',
    icon: RefreshIcon,
  },
  {
    name: 'Rede Kids',
    href: '/ministries/kids',
    icon: FaChild,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Header({ currentPage }: IHeaderProps) {
  return (
    <Popover className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-400/30 flex justify-between items-center py-2 px-5 md:px-24 lg:px-36">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <span className="sr-only">Comunidade Plenitude</span>
          <img
            className="h-14 w-auto md:h-14 rounded-full"
            src="/assets/logo/full.jpg"
            alt="Comunidade Plenitude"
          />
        </a>
      </div>
      <div className="-mr-2 -my-2 md:hidden">
        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open menu</span>
          <MenuAlt4Icon className="h-6 w-6" aria-hidden="true" />
        </Popover.Button>
      </div>
      <Popover.Group as="nav" className="hidden md:flex space-x-10">
        <Link href='/' >
          <a href="#" className="text-base font-medium text-gray-500 hover:text-black">
            <span className={currentPage === 'home' ? 'text-black' : ''}>
              Inicio
            </span>
          </a>
        </Link>

        <Link href='/churches'>
          <a href="#" className="text-base font-medium text-gray-500 hover:text-black">
            <span className={currentPage === 'churches' ? 'text-black' : ''}>
              Igrejas
            </span>
          </a>
        </Link>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              >
                <span className={currentPage === 'ministries' ? 'text-black' : ''}>Redes</span>
                <ChevronDownIcon
                  className={classNames(
                    open ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-64 max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {ministries.map(ministry => (
                        <a
                          key={ministry.name}
                          href={ministry.href}
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <ministry.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">{ministry.name}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Link href='/about'>
          <a href="#" className="text-base font-medium text-gray-500 hover:text-black">
            <span className={currentPage === 'about' ? 'text-black' : ''}>
              Sobre
            </span>
          </a>
        </Link>

        {/* <Link href='/events'>
          <a href="#" className="text-base font-medium text-gray-500 hover:text-black">
            <span className={currentPage === 'events' ? 'text-black' : ''}>
              Eventos
            </span>
          </a>
        </Link> */}
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

              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {ministries.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link href='/' >
                  <a href="#" className="text-base font-medium text-gray-500">
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
                  <a href="#" className="text-base font-medium text-gray-500">
                    <span className={currentPage === 'churches' ? 'text-black' : ''}>
                      Igrejas
                    </span>
                  </a>
                </Link>

                {/* <Link href='/events'>
                  <a href="#" className="text-base font-medium text-gray-500">
                  <span className={currentPage === 'events' ? 'text-black' : ''}>
                    Eventos
                  </span>
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
