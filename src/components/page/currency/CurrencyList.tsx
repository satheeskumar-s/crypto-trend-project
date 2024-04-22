import React, { useEffect, useMemo, useState } from 'react';
import {
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid/models/gridSortModel';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import {
  defaultLoadingRowCount,
  defaultPerPage,
} from '../../../config/pagination';
import { getColumns } from './CurrencyColumn';
import axios from 'axios';
import { GridRowParams } from '@mui/x-data-grid/models/params';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { sampleRowFromColumn } from '../../shared/table/RowComp';
import { coinList } from '../../../data/sample/coinList';
import { USE_TEST_DATA } from '../../../config/env';

const CurrencyList = (props: { setCoinId: any; categoryId: string }) => {
  const { setCoinId, categoryId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<Array<GridColDef>>([]);
  const [data, setData] = useState<any>([]);
  const [rowCount, setRowCount] = useState(13450);
  const [sortModel, setSortModel] = useState<
    Array<{ field: string; sort: GridSortDirection }>
  >([
    {
      field: 'market_cap',
      sort: 'asc',
    },
  ]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    setColumns(getColumns(isLoading));
  }, [isLoading]);

  const rows = sampleRowFromColumn(columns);
  function setErr(msg: string) {
    setError(msg);
  }

  console.log({ data });

  /**
   * Note that, there is no any api to get total count of coins.
   * So total count set by getting all coins list and then count
   */
  const setTotalCountAndGetData = () => {
    if (USE_TEST_DATA) {
      setRowCount(100000);
      getCoinsData();
      return;
    }

    const fetchUrl = coingeckoApi.coins.list;
    setIsLoading(true);
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        const totalCount = data?.data?.length;

        if (totalCount > 0) {
          setRowCount(totalCount);
          getCoinsData();
        } else {
          setIsLoading(false);
          setErr('Something went wrong when getting count');
        }
      })
      .catch(() => {
        setRowCount(0);
        setIsLoading(false);
        setErr('Something went wrong when getting count');
      });
  };

  const getCoinsData = () => {
    if (USE_TEST_DATA) {
      setIsLoading(false);
      setData(coinList);

      return;
    }

    setIsLoading(true);
    const fetchUrl = coingeckoApi.coins.markets(
      categoryId,
      paginationModel,
      sortModel
    );
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
      params: fetchUrl.data,
    })
      .then((data) => {
        setIsLoading(false);
        setData(data.data);
      })
      .catch(() => {
        setIsLoading(false);
        setErr('Something went wrong when get data');
        setData([]);
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
          field: 'market_cap',
          sort: 'asc',
        },
      ]);
    } else {
      setSortModel(model);
    }
  };

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const onRowClick = (params: GridRowParams) => {
    setCoinId(params.id);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <AlertComp msg={error} severity='error' />}

      <DataGrid
        rows={isLoading ? rows : data}
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
        rowCount={isLoading ? defaultLoadingRowCount : rowCount}
        disableColumnFilter
        disableColumnMenu
        paginationMode='server'
        rowHeight={100}
        onRowClick={onRowClick}
        loading={isLoading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default CurrencyList;
