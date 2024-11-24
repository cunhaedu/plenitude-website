import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Red_Hat_Display } from 'next/font/google';

import { client } from '../lib/apollo';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

import { AuthProvider } from '../contexts/AuthContext';

const redHatDisplay = Red_Hat_Display({ subsets: ['latin-ext'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <main className={redHatDisplay.className}>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default MyApp
