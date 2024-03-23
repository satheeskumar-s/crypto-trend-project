import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorNotification } from '../../../helper/Messages';
import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import { columns } from './CategoryColumn';
import axios from 'axios';

const CategoryList = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  function setErr(msg: string) {
    setError(msg);
    showErrorNotification(msg);
  }

  const getCategoryData = () => {
    const fetchUrl = coingeckoApi.categories.markets;
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        setData(data.data);
      })
      .catch(() => {
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
      />
    </div>
  );
};

export default CategoryList;
