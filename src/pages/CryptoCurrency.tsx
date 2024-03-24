import React, { useState } from 'react';
import TitleComp from '../components/shared/page/TitleComp';
import TabComp from '../components/tab/TabComp';
import CurrencyList from '../components/page/currency/CurrencyList';
import SearchCrypto from '../components/page/search/SearchCrypto';
import CategoryList from '../components/page/category/CategoryList';
import CurrencyInfo from '../components/page/currency/CurrencyInfo';

const CryptoCurrency = () => {
  const [coinId, setCoinId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  const tabs = [
    { id: 0, label: 'Currency' },
    { id: 1, label: 'Category' },
  ];

  const tabContent = [
    {
      id: 0,
      content: (
        <CurrencyList
          coinId={coinId}
          setCoinId={setCoinId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      ),
    },
    { id: 1, content: <CategoryList /> },
  ];

  return (
    <>
      <TitleComp title='Crypto currencies' />

      <SearchCrypto
        coinId={coinId}
        setCoinId={setCoinId}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <TabComp tabs={tabs} tabContent={tabContent} />

      <CurrencyInfo
        coinId={coinId}
        isOpen={!!coinId}
        onClose={() => {
          setCoinId('');
        }}
      />
    </>
  );
};

export default CryptoCurrency;
