import { XIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

type BannerProps = {
  text: {
    sm: string;
    lg: string;
  }
}

export function Banner({ text }: BannerProps) {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className={`bg-indigo-500 ${isClosed && 'hidden'}`}>
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8 h-16">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-700 p-2">
              <InformationCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">{text.sm}</span>
              <span className="hidden md:inline">
                {text.lg}
              </span>
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setIsClosed(true)}
              className="-mr-1 flex rounded-md p-2 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Fechar</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
