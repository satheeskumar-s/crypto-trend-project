import { CurrencyExchange } from '@mui/icons-material';
import React from 'react';
import Typography from '@mui/material/Typography';

const LogoIcon = (props: {
  logoName: string;
  isMobile?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClickMenu: (url: string) => void;
}) => {
  const logoDisplayStyle = props.isMobile
    ? { xs: 'flex', md: 'none' }
    : { xs: 'none', md: 'flex' };
  const currencyDisplayStyle = props.isMobile
    ? { xs: 'flex', md: 'none' }
    : { xs: 'none', md: 'flex' };
  const mr = props.isMobile ? 1 : 2;

  return (
    <>
      <CurrencyExchange sx={{ display: logoDisplayStyle, mr: 1 }} />
      <Typography
        variant='h6'
        noWrap
        component='a'
        onClick={() => props.onClickMenu('/trends')}
        sx={{
          mr: mr,
          flexGrow: 1,
          display: currencyDisplayStyle,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {props.logoName}
      </Typography>
    </>
  );
};

export default LogoIcon;
