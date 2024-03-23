import React from 'react';
import TrendList from '../components/page/trend/TrendList';
import TitleComp from '../components/shared/page/TitleComp';

const Trend = () => {
  return (
    <>
      <TitleComp title='Trending' />

      <TrendList />
    </>
  );
};

export default Trend;
