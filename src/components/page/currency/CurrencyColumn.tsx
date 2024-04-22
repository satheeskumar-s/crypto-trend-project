import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams';
import React from 'react';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';
import SparkLineChartComp from '../../shared/graph/SparkLineChartComp';
import Coin from '../../shared/page/Coin';
import PriceWithSeparator from '../../shared/page/PriceWithSeparator';
import { columnAttribute } from '../../shared/table/ColumnComp';

const RenderTitle = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  if (props.value == null) {
    return null;
  }

  return (
    <Coin
      name={props.value?.name}
      symbol={props.value?.symbol}
      image={props.value?.image}
    />
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
    <SparkLineChartComp
      data={props.value}
      width={props.colDef.computedWidth}
      plotType='line'
    />
  );
};

export const getColumns = (isLoading?: boolean): GridColDef[] => [
  columnAttribute({
    isLoading,
    field: 'id',
    headerName: 'Coin',
    type: 'number',
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => <RenderTitle {...params} />,
  }),
  columnAttribute({
    isLoading,
    field: 'current_price',
    headerName: 'Price',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => (
      <PriceWithSeparator price={params.value?.current_price} />
    ),
  }),
  columnAttribute({
    isLoading,
    field: 'price_change_percentage_1h_in_currency',
    headerName: '1h',
    type: 'number',
    sortable: false,
  }),
  columnAttribute({
    isLoading,
    field: 'price_change_percentage_24h_in_currency',
    headerName: '1d',
    type: 'number',
    sortable: false,
  }),
  columnAttribute({
    isLoading,
    field: 'price_change_percentage_7d_in_currency',
    headerName: '7d',
    type: 'number',
    sortable: false,
  }),
  columnAttribute({
    isLoading,
    field: 'market_cap',
    headerName: 'Market cap',
    type: 'number',
  }),
  columnAttribute({
    isLoading,
    field: 'sparkline_in_7d',
    headerName: '7 Days activity',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => {
      return params?.row?.sparkline_in_7d?.price;
    },
    renderCell: (params) => <GridSparklineCell {...params} plotType='line' />,
  }),
];
