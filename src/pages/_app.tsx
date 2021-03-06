import * as React from 'react';
import '../styles/tailwind.css'
import '../styles/colorful.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import DefaultTemplate from '../templates/Default';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultTemplate>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/ico" href="/imgs/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/imgs/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/imgs/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/imgs/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/imgs/favicon/site.webmanifest" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Reenie+Beanie&display=swap" rel="stylesheet" />
        <meta property="og:title" content="Lydia Michelle Art" />
        <meta property="og:description" content="Portfolio website for Lydia Michelle" />
        <meta property="og:url" content="https://lydiamichelle.art/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lydia Michelle Art" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@LydiaBu63687088" />
        <meta property="twitter:creator" content="@LydiaBu63687088" />
      </Head>
      <Component {...pageProps} />
    </DefaultTemplate>
  );
}

export default MyApp
