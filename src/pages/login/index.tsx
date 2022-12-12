import { Slide, toast, ToastContainer } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import Image from 'next/image';
import clx from 'classnames';

import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../../components/Header';
import { GetServerSideProps } from 'next';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data: any) {
    try {
      setLoading(true);
      await signIn(data);
    } catch (error) {
      toast.error('Email ou Senha inválidos', {
        position: 'bottom-right',
        transition: Slide,
      });
    } finally {
      setLoading(false);
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
                src="/assets/logo/logo-black.png"
                alt="Comunidade Plenitude"
                width={192}
                height={86}
                className="w-auto h-auto"
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
                className={clx(
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4",
                  "text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700",
                  {"cursor-not-allowed brightness-150": loading}
                )}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@plenitude-token']: token } = parseCookies(ctx);

  if(token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}
