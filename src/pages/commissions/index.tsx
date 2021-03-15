import React, { useEffect } from 'react';
import { getAllCommissions } from 'lib/node-only/api';
import { GetStaticProps } from 'next';
import { Commission } from 'types/Commission';
import Commissions from './[slug]';

interface Props {
  allCommissions: Commission[];
}

export const CommissionsHome: React.FC<Props> = ({ allCommissions }) => {
  useEffect(() => {
    if (allCommissions.length === 0) {
      return;
    }
    window.history.pushState(
      '', document.title,
      `${window.location.pathname}${window.location.search}/${allCommissions[0].slug}`,
    );
  }, []);

  if (allCommissions.length === 0) {
    return (
      <div className="flex flex-col justify-center content-center items-center text-center my-5 lg:my-64 w-full">
        <h2 className="text-6xl my-10 lg:my-24">Sorry!</h2>
        <h3 className="text-3xl">
          It looks like I have no open commissions at this time, please check back later.
        </h3>
      </div>
    );
  }

  return (
    <Commissions allCommissions={allCommissions}
      commission={allCommissions[0]} currentIdx={0}
    />
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const allCommissions = await getAllCommissions();

  return { props: { allCommissions } };
};

export default CommissionsHome;
