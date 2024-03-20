import React, { ReactNode } from 'react';

import {
  CurrencyBitcoin,
  HelpOutline,
  SvgIconComponent,
  TrendingUp,
} from '@mui/icons-material';

import Trend from '../pages/Trend';
import About from '../pages/About';
import CryptoCurrency from '../pages/CryptoCurrency';

export type RouteType = {
  url: string;
  label: string;
  icon: SvgIconComponent;
  component: ReactNode;
};
const routes: Array<RouteType> = [
  {
    url: '/trends',
    label: 'Trends',
    icon: TrendingUp,
    component: <Trend />,
  },
  {
    url: '/crypto-currency',
    label: 'Crypto currencies',
    icon: CurrencyBitcoin,
    component: <CryptoCurrency />,
  },
  {
    url: '/about',
    label: 'About',
    icon: HelpOutline,
    component: <About />,
  },
];

export default routes;
