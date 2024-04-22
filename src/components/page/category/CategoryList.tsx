import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorNotification } from '../../../helper/Messages';
import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import { columns } from './CategoryColumn';
import axios from 'axios';
import { LinearProgress } from '@mui/material';
import { category } from '../../../data/sample/category';
import { USE_TEST_DATA } from '../../../config/env';

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>([]);

  function setErr(msg: string) {
    setError(msg);
    showErrorNotification(msg);
  }

  const getCategoryData = () => {
    if (USE_TEST_DATA) {
      setData(category);
      return;
    }

    setIsLoading(true);
    const fetchUrl = coingeckoApi.categories.markets;
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        setIsLoading(false);
        setData(data.data);
      })
      .catch(() => {
        setIsLoading(false);
        setErr('Something went wrong when get data');
      });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <AlertComp msg={error} severity='error' />}

      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[50, 100]}
        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
        loading={isLoading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default CategoryList;
