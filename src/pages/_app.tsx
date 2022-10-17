import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import { client } from '../lib/apollo';

import '@tremor/react/dist/esm/tremor.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default MyApp
