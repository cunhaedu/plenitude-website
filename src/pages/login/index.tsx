import { Slide, toast, ToastContainer } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Image from 'next/image';

import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../../components/Header';

import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    try {
      await signIn(data);
    } catch (error) {
      toast.error('Email ou Senha inválidos', {
        position: 'bottom-right',
        transition: Slide,
      });
    }
  }

  return (
    <div>
      <Header currentPage='adm' />

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className='flex flex-col align-middle justify-center'>
            <div className='self-center'>
              <Image
                src="/assets/logo/full.webp"
                alt="Comunidade Plenitude"
                width={176}
                height={96}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login no sistema
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register('email')}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço de email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                />
              </div>
            </div>

            <div>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
