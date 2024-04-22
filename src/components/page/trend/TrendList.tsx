import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorNotification } from '../../../helper/Messages';
import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import { defaultPerPage } from '../../../config/pagination';
import { columns } from './TrendColumn';
import axios from 'axios';
import { LinearProgress } from '@mui/material';
import { trends } from '../../../data/sample/trends';
import { USE_TEST_DATA } from '../../../config/env';

const TrendList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>([]);

  function setErr(msg: string) {
    setError(msg);
    showErrorNotification(msg);
  }

  const getTrendData = () => {
    if (USE_TEST_DATA) {
      setData(trends.coins.map((eachCoin: any) => eachCoin.item));
      return;
    }

    setIsLoading(true);
    const fetchUrl = coingeckoApi.trend;
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        setIsLoading(false);
        if (data.data.coins) {
          setData(data.data.coins.map((eachCoin: any) => eachCoin.item));
        } else {
          setData([]);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErr('Something went wrong when get data');
      });
  };

  useEffect(() => {
    getTrendData();
  }, []);

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
        pageSizeOptions={[25, 50, 100]}
        disableColumnFilter
        disableColumnMenu
        rowHeight={75}
        disableRowSelectionOnClick
        loading={isLoading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default TrendList;
