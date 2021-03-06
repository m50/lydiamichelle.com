import React, { useEffect, useState } from 'react';
import { getAllCommissions, getCommissionBySlug } from 'lib/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Commission } from 'types/Commission';
import { CommissionView } from 'templates/CommissionView';
import Head from 'next/head';
import NavArrow from 'components/styled/NavButton';
import CommissionContact from 'components/CommissionContact';

interface Props {
  commission: Commission;
  allCommissions: Commission[];
  currentIdx: number;
}

export const Commissions: React.FC<Props> = ({ commission, allCommissions, currentIdx }) => {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState<string>('');
  const [nextLink, setNextLink] = useState<string>('');

  useEffect(() => {
    const prefix = '/commissions';
    let prev = currentIdx - 1;
    if (prev < 0) {
      prev = allCommissions.length - 1;
    }
    let next = currentIdx + 1;
    if (next >= allCommissions.length) {
      next = 0;
    }
    setPrevLink(`${prefix}/${allCommissions[prev].slug}`);
    setNextLink(`${prefix}/${allCommissions[next].slug}`);
  }, [allCommissions, currentIdx]);

  if (!router.isFallback && !commission?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className="h-full flex flex-col">
      <Head>
        <title>{commission.title} Commissions | Lydia Michelle Art</title>
      </Head>
      {/* Nav Arrows for mobile */}
      <div className="flex justify-around bg-theme-pink lg:hidden">
        <NavArrow className="w-1/2 flex my-5" to={prevLink}>&#8592;</NavArrow>
        <NavArrow className="w-1/2 flex my-5" to={nextLink}>&#8594;</NavArrow>
      </div>
      {/* Nav Arrows are on the left/right of commission view on desktop */}
      <div className="flex justify-around items-center bg-theme-pink pb-10 lg:py-20">
        <NavArrow className="w-1/4 hidden lg:flex my-10" to={prevLink}>&#8592;</NavArrow>
        <CommissionView commission={commission} className="w-1/2 px-6 lg:px-0" />
        <NavArrow className="w-1/4 hidden lg:flex my-10" to={nextLink}>&#8594;</NavArrow>
      </div>
      <CommissionContact commission={commission} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const commission = await getCommissionBySlug(params?.slug as string);
  const allCommissions = await getAllCommissions();
  const currentIdx = allCommissions.findIndex((c) => c.slug === commission.slug);

  return { props: { commission, allCommissions, currentIdx } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCommissions = await getAllCommissions();

  return {
    paths: allCommissions.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Commissions;