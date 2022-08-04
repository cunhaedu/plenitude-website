import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import '../styles/globals.css';
import { client } from '../lib/apollo';

import 'swiper/css';
import "swiper/css/pagination";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
