import Amplify from "aws-amplify";
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from "react";
import theme from 'theme/theme'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'
import AuthGuard from 'contexts/AuthGuard';
import { ApolloProvider } from "@apollo/client";
import client from "api/ApolloClient";

function MyApp ({ Component, pageProps }: AppProps) {

  // don't run for SSR/static export
  if (typeof window !== "undefined") {
    // Amplify
    Amplify.configure({
      Auth: {
        region: process.env.NEXT_PUBLIC_REGION,
        userPoolId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID,
        userPoolWebClientId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_CLIENT_ID,
      },
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Horizon UI Dashboard</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </ApolloProvider>
      </React.StrictMode>
    </ChakraProvider>
  )
}

export default MyApp
