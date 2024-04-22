import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';

export const columnAttribute = (
  props: GridColDef & {
    isLoading?: boolean;
  }
): GridColDef => {
  let loadingCompAttr = {};

  if (props.isLoading) {
    loadingCompAttr = {
      renderCell: () => <Skeleton width='85%' height='50%' />,
      valueGetter: undefined,
    };
  }
  return {
    width: 200,
    align: 'left',
    headerAlign: 'left',
    ...props,
    ...loadingCompAttr,
  };
};
