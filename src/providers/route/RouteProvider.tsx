import React, { ReactNode } from 'react';

import {
  CurrencyBitcoin,
  HelpOutline,
  SvgIconComponent,
  TrendingUp,
} from '@mui/icons-material';

import Trend from '../../pages/Trend';
import About from '../../pages/About';
import CryptoCurrency from '../../pages/CryptoCurrency';
import { Calander } from '../../calander/Calander';

export type RouteType = {
  url: string;
  label: string;
  icon: SvgIconComponent;
  component: ReactNode;
};
const routes: Array<RouteType> = [
  {
    url: '/crypto-currency',
    label: 'Crypto currencies',
    icon: CurrencyBitcoin,
    component: <CryptoCurrency />,
  },
  {
    url: '/trends',
    label: 'Trends',
    icon: TrendingUp,
    component: <Trend />,
  },
  {
    url: '/about',
    label: 'About',
    icon: HelpOutline,
    component: <About />,
  },
  {
    url: '/cal',
    label: 'Cal',
    icon: HelpOutline,
    component: <Calander />,
  },
];

export default routes;
