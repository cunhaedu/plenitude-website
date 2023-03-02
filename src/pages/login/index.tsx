import { Slide, toast, ToastContainer } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import Image from 'next/image';
import clx from 'classnames';

import { AuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';

import styles from './styles.module.scss';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data: any) {
    setLoading(true);

    try {
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

      <main className={styles.login}>
        <div>
          <div className={styles.login__header}>
            <div>
              <Image
                src="/assets/logo/logo-black.png"
                alt="Comunidade Plenitude"
                width={192}
                height={86}
              />
            </div>
            <h2>Login no sistema</h2>
          </div>

          <form
            className={styles.login__form}
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className={styles.input_container}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  {...register('email')}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Endereço de email"
                  className='rounded-t-md'
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Senha"
                  className='rounded-b-md'
                />
              </div>
            </div>

            <div className={styles.button_container}>
              <button
                type="submit"
                className={clx('group', {'isLoading': loading})}
                disabled={loading}
              >
                <span>
                  <LockClosedIcon
                    aria-hidden
                    height={20}
                    width={20}
                    className="group-hover:text-indigo-400"
                  />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </main>

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
