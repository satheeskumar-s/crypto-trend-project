import routes, { RouteType } from '../../../providers/RouteProvider';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import BtnComp from '../../shared/btn/BtnComp';

const Menus = (props: {
  isMobile?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClickMenu: (url: string) => void;
}) => {
  return props.isMobile ? (
    <>
      {routes.map((eachRoute: RouteType) => (
        <BtnComp
          key={eachRoute.url}
          label={eachRoute.label}
          onClick={() => props.onClickMenu(eachRoute.url)}
          startIcon={<eachRoute.icon />}
        />
      ))}
    </>
  ) : (
    <>
      {routes.map((eachRoute: RouteType) => (
        <MenuItem
          key={eachRoute.url}
          onClick={() => props.onClickMenu(eachRoute.url)}
        >
          <eachRoute.icon />
          <Typography textAlign='center'>{eachRoute.label}</Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default Menus;
