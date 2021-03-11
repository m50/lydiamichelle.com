import * as React from 'react';
import '../styles/tailwind.css'
import '../styles/colorful.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import DefaultTemplate from '../templates/Default';
import Head from 'next/head';
import { init as sentry } from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { init as insight, trackPages, DEFAULT_APP } from "insights-js";
import { isClientSide, isProduction } from 'lib/helpers';

sentry({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.5,
  release: process.env.RELEASE,
});

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.INSIGHTS_KEY && isProduction() && isClientSide()) {
    insight(process.env.INSIGHTS_KEY, { ignoreErrors: true });
    trackPages();
  }

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
