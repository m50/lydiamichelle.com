import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import * as React from 'react';
import { getAllseries as getAllSeries, getSeriesBySlug } from '../../lib/api';
import { Series } from '../../types/Series';
import SeriesTemplate from '../../components/templates/Series';

interface Props {
  series: Series;
}

const Series: React.FC<Props> = ({ series }) => {
  const router = useRouter()
  if (!router.isFallback && !series?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  return <SeriesTemplate {...series} />;
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const series = getSeriesBySlug(params?.slug as string);

  return { props: { series } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSeries = getAllSeries();

  return {
    paths: allSeries.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Series;
