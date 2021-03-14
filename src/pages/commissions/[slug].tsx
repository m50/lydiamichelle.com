import React from 'react';
import { getAllCommissions, getCommissionBySlug } from 'lib/node-only/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import type { Commission } from 'types/Commission';
import { CommissionView } from 'templates/CommissionView';
import Head from 'next/head';
import NavArrow from 'components/styled/NavButton';
import usePrevNextLinks from 'hooks/usePrevNextLinks';
import dynamic from 'next/dynamic';

const CommissionContact = dynamic(
  () => import('../../components/CommissionContact'),
  { loading: () => <p className="w-full text-center">...</p> },
);

interface Props {
  commission: Commission;
  allCommissions: Commission[];
  currentIdx: number;
}

export const Commissions: React.FC<Props> = ({ commission, allCommissions, currentIdx }) => {
  const router = useRouter();
  const { prevLink, nextLink } = usePrevNextLinks('/commissions', {
    currentIdx,
    arr: allCommissions,
    current: commission,
    accessor: 'slug',
  });

  const morePages = allCommissions.length > 1;

  if (!router.isFallback && !commission?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="h-full flex flex-col">
      <Head>
        <title>{commission.title} Commissions | Lydia Michelle Art</title>
      </Head>
      {/* Nav Arrows for mobile */}
      {morePages && (
        <div className="flex justify-around bg-theme-pink lg:hidden">
          <NavArrow className="w-1/2 flex my-5" to={prevLink} left />
          <NavArrow className="w-1/2 flex my-5" to={nextLink} />
        </div>
      )}
      {/* Nav Arrows are on the left/right of commission view on desktop */}
      <div className="flex justify-around items-center bg-theme-pink pb-10 lg:py-20 pt-5">
        { morePages
          ? <NavArrow className="w-1/4 hidden lg:flex my-10" to={prevLink} left />
          : <div className="w-1/4 h-full hidden lg:block" /> }
        <CommissionView commission={commission} className="w-1/2 px-6 lg:px-0" />
        { morePages
          ? <NavArrow className="w-1/4 hidden lg:flex my-10" to={nextLink} />
          : <div className="w-1/4 h-full hidden lg:block" /> }
      </div>
      <CommissionContact commission={commission} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const commission = await getCommissionBySlug(params?.slug as string) as Commission;
  const allCommissions = await getAllCommissions();
  const currentIdx = allCommissions.findIndex((c) => c.slug === commission.slug);

  return { props: { commission, allCommissions, currentIdx } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCommissions = await getAllCommissions();

  return {
    paths: allCommissions.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export default Commissions;
