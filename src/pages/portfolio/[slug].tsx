import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import * as React from 'react';
import { getAllSeries, getSeriesBySlug } from '../../lib/api';
import { Series as SeriesType } from '../../types/Series';
import SeriesTemplate from '../../components/templates/Series';

interface Props {
  series: SeriesType;
}

const Series: React.FC<Props> = ({ series }) => {
  const router = useRouter()
  if (!router.isFallback && !series?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return <SeriesTemplate {...series} />;
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const series = await getSeriesBySlug(params?.slug as string);

  return { props: { series } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSeries = await getAllSeries();

  return {
    paths: allSeries.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Series;
