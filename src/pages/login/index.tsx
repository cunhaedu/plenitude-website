import { Slide, toast, ToastContainer } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import Image from 'next/image';

import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/@ui/button';
import { Header } from '@/components/Header';

import styles from './styles.module.scss';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
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
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Endereço de email"
                  className='rounded-t-md'
                  {...register('email')}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Senha"
                  className='rounded-b-md'
                  {...register('password')}
                />
              </div>
            </div>

            <div className={styles.button_container}>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Login
              </Button>
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
