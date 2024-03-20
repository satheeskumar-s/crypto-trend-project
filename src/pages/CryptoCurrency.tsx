import React from 'react';
import TitleComp from '../components/shared/page/TitleComp';
import TabComp from '../components/tab/TabComp';
import Currency from '../components/page/Currency';

const CryptoCurrency = () => {
  const tabs = [
    { id: 0, label: 'Currency' },
    { id: 1, label: 'Category' },
  ];

  const tabContent = [
    {
      id: 0,
      content: (
        <div>
          <Currency />
        </div>
      ),
    },
    { id: 1, content: <div>bb</div> },
  ];

  return (
    <>
      <TitleComp title='Crypto currencies' />

      <TabComp tabs={tabs} tabContent={tabContent} />
    </>
  );
};

export default CryptoCurrency;
