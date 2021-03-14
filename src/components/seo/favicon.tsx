import Head from 'next/head';
import React from 'react';

const Favicons = () => (
  <Head>
    <link rel="icon" type="image/ico" href="/imgs/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/imgs/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/imgs/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/imgs/favicon/favicon-16x16.png" />
    <link rel="manifest" href="/imgs/favicon/site.webmanifest" />
  </Head>
);

export default Favicons;
