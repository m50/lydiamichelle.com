import React from 'react';
import { Series } from 'collections/series/Series';
import SeriesTemplate from 'templates/Series';
import { GetStaticProps } from 'next';
import { getInstagramData } from 'lib/instagram';
import useInstagram from 'hooks/useInstagram';

interface Props {
  initSeries: Series;
}

const Instagram: React.FC<Props> = ({ initSeries }) => {
  const series = useInstagram(initSeries);

  return <SeriesTemplate {...series} />;
};

export const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const initSeries = await getInstagramData();

  return { props: { initSeries } };
};

export default Instagram;
