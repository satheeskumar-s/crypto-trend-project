import React from 'react';
import { formatPrice } from '../../../helper/general';

const PriceWithSeparator = (props: {
  price: number | string;
  currency?: string;
}) => {
  const { currency, price } = props;
  let output = price;

  if (typeof price === 'number') {
    output = formatPrice(price, currency);
  }

  return <> {output} </>;
};

export default PriceWithSeparator;
