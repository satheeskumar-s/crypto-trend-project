import React from 'react';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const Coin = (props: { name: string; symbol: string; image: string }) => {
  const { image, symbol, name } = props;
  return (
    <CardHeader
      avatar={<Avatar src={image} alt={'C'} />}
      title={name}
      subheader={symbol}
    />
  );
};

export default Coin;
