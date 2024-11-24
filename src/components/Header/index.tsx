import { MenuAlt4Icon, XIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import Link from 'next/link';
import cls from 'classnames';

import styles from './styles.module.scss';

interface IHeaderProps {
  currentPage?:
    | 'home'
    | 'about'
    | 'churches'
    | 'ministries'
    | 'peniel'
    | 'events'
    | 'adm';
}

export function Header({ currentPage }: IHeaderProps) {
  return (
    <Popover className={styles.popover}>
      <div className={styles.logo_container}>
        <Link href="/">
            <span>Comunidade Plenitude</span>
            <div>
              <Image
                src="/assets/logo/logo-black.png"
                alt="Comunidade Plenitude"
                height={48}
                width={128}
              />
            </div>
        </Link>
      </div>

      <div className={styles.open_menu_container}>
        <Popover.Button>
          <span>Open menu</span>
          <MenuAlt4Icon aria-hidden />
        </Popover.Button>
      </div>

      <Popover.Group as="nav" className={styles.desktop_navigation_container}>
        <Link href='/'>
          <span className={cls({'text-black' : currentPage === 'home' })}>
            Início
          </span>
        </Link>

        <Link href='/about'>
          <span className={cls({ 'text-black' : currentPage === 'about' })}>
            Sobre
          </span>
        </Link>

        <Link href='/ministries'>
          <span className={cls({ 'text-black' : currentPage === 'ministries' })}>
            Redes
          </span>
        </Link>

        <Link href='/churches'>
          <span className={cls({ 'text-black' : currentPage === 'churches' })}>
            Igrejas
          </span>
        </Link>

        <Link href='/peniel'>
          <span className={cls({ 'text-black' : currentPage === 'peniel' })}>
            Peniel
          </span>
        </Link>

        <Link href='/events'>
          <span className={cls({ 'text-black' : currentPage === 'events' })}>
            Eventos
          </span>
        </Link>

        <Link href='/login' className={cls({
            'bg-gray-500 text-white': currentPage === 'adm',
            'text-gray-500 bg-none': currentPage !== 'adm',
          })}
        >
          Admin
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
        <Popover.Panel focus className={styles.popover_panel}>
          <div>
            <div className={styles.phone_menu_header}>
              <div>
                <div className={styles.phone_menu_header_logo}>
                  <Image
                    src="/assets/logo/logo-black.png"
                    alt="Comunidade Plenitude"
                    height={24}
                    width={104}
                  />
                </div>
                <div className={styles.phone_menu_header_close_button}>
                  <Popover.Button>
                    <span>Close menu</span>
                    <XIcon aria-hidden />
                  </Popover.Button>
                </div>
              </div>
            </div>

            <div className={styles.phone_menu_links_container}>
              <div>
                <Link href='/'>
                  <span className={cls({ 'text-black': currentPage === 'home' })}>
                    Inicio
                  </span>
                </Link>

                <Link href='/about'>
                  <span className={cls({ 'text-black': currentPage === 'about' })}>
                    Sobre
                  </span>
                </Link>

                <Link href='/churches'>
                  <span className={cls({ 'text-black': currentPage === 'churches' })}>
                    Igrejas
                  </span>
                </Link>

                <Link href='/ministries'>
                  <span className={cls({ 'text-black': currentPage === 'ministries' })}>
                    Redes
                  </span>
                </Link>

                <Link href='/peniel'>
                  <span className={cls({ 'text-black': currentPage === 'peniel' })}>
                    Peniel
                  </span>
                </Link>

                <Link href='/events'>
                  <span className={cls({ 'text-black': currentPage === 'events' })}>
                    Eventos
                  </span>
                </Link>
              </div>

              <Link href='/login'>
                Admin
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
