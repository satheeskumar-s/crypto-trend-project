import React from 'react';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';

const BtnComp = (props: {
  key: string;
  label: string;
  onClick: () => void;
  startIcon: ReactNode;
}) => {
  return (
    <Button
      className='btn-comp'
      key={props.key}
      onClick={props.onClick}
      startIcon={props.startIcon}
    >
      {props.label}
    </Button>
  );
};

export default BtnComp;
