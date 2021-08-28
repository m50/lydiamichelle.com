import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import '../styles/colorful.css';
import { AppProps } from 'next/app';
import DefaultTemplate from 'templates/Default';
import Head from 'next/head';
import { init as sentry } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { init as insight, trackPages, track, parameters } from 'insights-js';
import { isClientSide, isProduction } from 'lib/helpers';
import Favicons from 'components/seo/favicon';
import OG from 'components/seo/og';
import Twitter from 'components/seo/twitter';

sentry({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.5,
  release: process.env.RELEASE,
});

let isTracking = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!isTracking && process.env.INSIGHTS_KEY && isProduction() && isClientSide()) {
      insight(process.env.INSIGHTS_KEY, { ignoreErrors: true });
      trackPages();
      track({
        id: 'entered-site',
        parameters: {
          referrer: parameters.referrer(),
          locale: parameters.locale(),
          screenSize: parameters.screenType(),
        },
      });
      isTracking = true;
    }
  }, []);

  return (
    <DefaultTemplate>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Favicons />
      <OG />
      <Twitter />
      <Component {...pageProps} />
    </DefaultTemplate>
  );
}

export default MyApp;
