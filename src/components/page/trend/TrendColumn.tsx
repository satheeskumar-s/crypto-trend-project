import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams';
import React from 'react';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';

const RenderName = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  return (
    <>
      {props.value && (
        <>
          {props.value?.name} {props.value?.symbol}
          <img width={24} height={24} alt='1' src={props.value?.thumb} />
        </>
      )}
    </>
  );
};

const RenderLast7Days = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  return (
    <>
      <img alt='1' src={props.value} />
    </>
  );
};

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    align: 'left',
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => <RenderName {...params} />,
    type: 'string',
    sortable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    valueGetter: (params: GridValueGetterParams) => params.row.data.price,
    sortable: false,
    width: 150,
    align: 'center',
  },
  {
    field: 'total_volume',
    headerName: 'Total Volume',
    type: 'number',
    valueGetter: (params: GridValueGetterParams) =>
      params.row.data.total_volume,
    sortable: false,
    width: 150,
  },
  {
    field: 'last_7_days',
    headerName: 'Last 7 days',
    type: 'number',
    valueGetter: (params: GridValueGetterParams) => params.row.data.sparkline,
    renderCell: (params) => <RenderLast7Days {...params} />,
    sortable: false,
    width: 200,
  },
];
