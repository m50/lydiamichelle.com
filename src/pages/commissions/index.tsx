import React, { useEffect } from 'react';
import { getAllCommissions } from 'lib/api';
import { GetStaticProps } from 'next';
import { Commission } from 'types/Commission';
import CommissionContact from 'components/CommissionContact';

interface Props {
  firstCommission: Commission;
}

export const Commissions: React.FC<Props> = ({ firstCommission }) => {
  useEffect(() => {
    window.location.href += '/' + firstCommission.slug;
  }, []);
  return (
    <CommissionContact commission={firstCommission} />
  );
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
  const allCommissions = await getAllCommissions();

  return { props: { firstCommission: allCommissions[0] } };
}

export default Commissions;
