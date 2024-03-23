import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams';
import React from 'react';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';

const RenderGainers = (
  props: GridRenderCellParams & {
    plotType?: SparkLineChartProps['plotType'];
  }
) => {
  return (
    <>
      {props.value?.top_3_coins &&
        props.value?.top_3_coins.map((eachImage: string) => {
          return (
            <img
              key={eachImage}
              width={24}
              height={24}
              alt='1'
              src={eachImage}
            />
          );
        })}
    </>
  );
};

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Category',
    width: 200,
    align: 'left',
    type: 'string',
  },
  {
    field: 'top_3_coins',
    headerName: 'Top gainers',
    // type: 'number',
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => <RenderGainers {...params} />,
    sortable: false,
    width: 150,
  },
  {
    field: 'market_cap',
    headerName: 'Market cap',
    type: 'number',
    width: 150,
  },
  {
    field: 'market_cap_change_24h',
    headerName: '24h',
    type: 'number',
    width: 150,
  },
  {
    field: 'volume_24h',
    headerName: '24h Volume',
    type: 'number',
    width: 200,
  },
];
