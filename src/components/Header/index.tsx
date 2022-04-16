import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Header() {
  return (
    <Popover className="relative bg-black backdrop-blur-3xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Logo</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Comunidade Plenitude"
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link href='/' >
              <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                início
              </a>
            </Link>

            <Link href='/about'>
              <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                Sobre
              </a>
            </Link>

            <Link href='/ministries'>
              <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                Ministérios
              </a>
            </Link>

            <Link href='/places'>
              <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                Locais
              </a>
            </Link>

            <Link href='/events'>
              <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                Eventos
              </a>
            </Link>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Agora no Insta
            </a>
          </div>
        </div>
      </div>

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
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-black divide-y-2 divide-gray-900">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
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
                  <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                    início
                  </a>
                </Link>

                <Link href='/about'>
                  <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                    Sobre
                  </a>
                </Link>

                <Link href='/ministries'>
                  <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                    Ministérios
                  </a>
                </Link>

                <Link href='/places'>
                  <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                    Locais
                  </a>
                </Link>

                <Link href='/events'>
                  <a href="#" className="text-base font-medium text-gray-300 hover:text-white">
                    Eventos
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
