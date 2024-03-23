import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams';
import React from 'react';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';
import { SparkLineChart } from '@mui/x-charts';

const RenderTitle = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  if (props.value == null) {
    return null;
  }

  return (
    <>
      {props.value?.image && (
        <img width={24} height={24} alt='1' src={props.value?.image} />
      )}
      {props.value?.name} ({props.value?.symbol})
    </>
  );
};

const GridSparklineCell = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  if (!props.value) {
    return null;
  }

  return (
    <SparkLineChart
      data={props.value}
      width={props.colDef.computedWidth}
      plotType={props.plotType}
    />
  );
};

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Coin',
    type: 'number',
    width: 200,
    align: 'left',
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => <RenderTitle {...params} />,
    // sortable: false
  },
  {
    field: 'current_price',
    headerName: 'Price',
    // type: 'number',
    width: 90,
    sortable: false,
  },
  {
    field: 'price_change_percentage_1h_in_currency',
    headerName: '1h',
    type: 'number',
    width: 90,
    sortable: false,
  },
  {
    field: 'price_change_percentage_24h_in_currency',
    headerName: '1d',
    type: 'number',
    width: 90,
    sortable: false,
  },
  {
    field: 'price_change_percentage_7d_in_currency',
    headerName: '7d',
    type: 'number',
    width: 90,
    sortable: false,
  },
  {
    field: 'market_cap',
    headerName: 'Market cap',
    type: 'number',
    width: 90,
  },
  {
    field: 'sparkline_in_7d',
    headerName: '7 Days activity',
    sortable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.sparkline_in_7d.price,
    renderCell: (params) => <GridSparklineCell {...params} plotType='line' />,
  },
];
