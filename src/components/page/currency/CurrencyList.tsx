import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid/models/gridSortModel';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import { defaultPerPage } from '../../../config/pagination';
import { columns } from './CurrencyColumn';
import axios from 'axios';

const CurrencyList = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
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

  function setErr(msg: string) {
    setError(msg);
  }

  /**
   * Note that, there is no any api to get total count of coins.
   * So total count set by getting all coins list and then count
   */
  const setTotalCountAndGetData = () => {
    const fetchUrl = coingeckoApi.coins.list;
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        const totalCount = data?.data?.length;

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
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
      params: fetchUrl.data,
    })
      .then((data) => {
        setData(data.data);
      })
      .catch(() => {
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
        paginationMode='server'
        rowHeight={100}
      />
    </div>
  );
};

export default CurrencyList;
