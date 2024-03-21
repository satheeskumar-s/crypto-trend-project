import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { coingeckoApi } from '../../providers/api/coingecko';
import {
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid/models/gridSortModel';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { AlertComp } from '../shared/message/AlertComp';
import { showErrorNotification } from '../../helper/Messages';
import { defaultPerPage } from '../../config/pagination';
import { SparkLineChart } from '@mui/x-charts';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Coin',
    type: 'number',
    width: 200,
    align: 'left',
    valueGetter: (params: GridValueGetterParams) => params.row,
    renderCell: (params) => <RenderTitle {...params} />,
  },
  {
    field: 'current_price',
    headerName: 'Price',
    // type: 'number',
    width: 90,
  },
  {
    field: 'price_change_percentage_1h_in_currency',
    headerName: '1h',
    type: 'number',
    width: 90,
  },
  {
    field: 'price_change_percentage_24h_in_currency',
    headerName: '1d',
    type: 'number',
    width: 90,
  },
  {
    field: 'price_change_percentage_7d_in_currency',
    headerName: '7d',
    type: 'number',
    width: 90,
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
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.sparkline_in_7d.price,
    renderCell: (params) => <GridSparklineCell {...params} plotType='line' />,
  },
];

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

const Currency = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(13450);
  const [sortModel, setSortModel] = useState<
    Array<{ field: string; sort: GridSortDirection }>
  >([
    {
      field: 'id',
      sort: 'desc',
    },
  ]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  function setErr(msg: string) {
    setError(msg);
    showErrorNotification(msg);
  }

  /**
   * Note that, there is no any api to get total count of coins.
   * So total count set by getting all coins list and then count
   */
  const setTotalCountAndGetData = () => {
    const fetchUrl = coingeckoApi.coins.list;
    fetch(fetchUrl.url, {
      mode: 'cors',
      headers: fetchUrl.headers,
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const totalCount = data.length;

        if (totalCount > 0) {
          setRowCount(totalCount);
          getCoinsData();
        } else {
          setErr('Something went wrong when getting count');
        }
      })
      .catch(() => {
        setRowCount(0);
        setErr('Something went wrong when getting count');
      });
  };

  const getCoinsData = () => {
    const fetchUrl = coingeckoApi.coins.markets(paginationModel, sortModel);
    fetch(fetchUrl.url, {
      mode: 'cors',
      headers: fetchUrl.headers,
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setErr('Something went wrong when get data');
      });
  };

  useEffect(() => {
    setTotalCountAndGetData();
  }, []);

  useEffect(() => {
    getCoinsData();
  }, [sortModel, paginationModel]);

  const onSortModelChange = (model: GridSortModel) => {
    if (model.length === 0) {
      setSortModel([
        {
          field: 'id',
          sort: 'desc',
        },
      ]);
    } else {
      setSortModel(model);
    }
  };

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <AlertComp msg={error} severity='error' />}

      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: defaultPerPage },
          },
        }}
        // pageSizeOptions={[5, 10]}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        disableColumnFilter
        disableColumnMenu
      />
    </div>
  );
};

export default Currency;
