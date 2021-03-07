import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getAllSeries, getSeriesBySlug } from 'lib/node-only/api';
import { Series as SeriesType } from 'types/Series';
import SeriesTemplate from 'templates/Series';

interface Props {
  series: SeriesType;
}

const Series: React.FC<Props> = ({ series }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !series?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <SeriesTemplate {...series} />;
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const series = await getSeriesBySlug(params?.slug as string);

  return { props: { series } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSeries = await getAllSeries();

  return {
    paths: allSeries.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export default Series;
