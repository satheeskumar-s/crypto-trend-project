import React from 'react';
import { Alert } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import {
  AlertColor,
  AlertPropsColorOverrides,
} from '@mui/material/Alert/Alert';

export const AlertComp = (props: {
  msg: string;
  severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
}) => {
  const { msg, severity } = props;
  return <Alert severity={severity || 'success'}>{msg}</Alert>;
};
