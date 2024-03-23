import React from 'react';
import TitleComp from '../components/shared/page/TitleComp';
import TabComp from '../components/tab/TabComp';
import CurrencyList from '../components/page/currency/CurrencyList';
import SearchCrypto from '../components/page/search/SearchCrypto';
import CategoryList from '../components/page/category/CategoryList';

const CryptoCurrency = () => {
  const tabs = [
    { id: 0, label: 'Currency' },
    { id: 1, label: 'Category' },
  ];

  const tabContent = [
    {
      id: 0,
      content: <CurrencyList />,
    },
    { id: 1, content: <CategoryList /> },
  ];

  return (
    <>
      <TitleComp title='Crypto currencies' />

      <SearchCrypto />
      <TabComp tabs={tabs} tabContent={tabContent} />
    </>
  );
};

export default CryptoCurrency;
