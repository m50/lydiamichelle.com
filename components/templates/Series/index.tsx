import * as React from 'react';
import { Series } from '../../../types/Series';
import Head from 'next/head';
import Header from './Header';
import Body from './Body';
import ImageGrid from './ImageGrid';

export const SeriesTemplate: React.FC<Series> = (series) => (
  <article>
    <Head>
      <title>{series.title} | Lydia Michelle Art</title>
      <meta property="og:image" content={series.images[0].image} />
    </Head>
    <Header {...series} />
    <Body content={series.body} />
    <ImageGrid images={series.images} />
  </article>
);

export default SeriesTemplate;
