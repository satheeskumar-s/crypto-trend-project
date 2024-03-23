import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorNotification } from '../../../helper/Messages';
import { coingeckoApi } from '../../../providers/api/coingecko';
import { AlertComp } from '../../shared/message/AlertComp';
import { defaultPerPage } from '../../../config/pagination';
import { columns } from './TrendColumn';

const TrendList = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  function setErr(msg: string) {
    setError(msg);
    showErrorNotification(msg);
  }

  const getTrendData = () => {
    const fetchUrl = coingeckoApi.trend;
    fetch(fetchUrl.url, {
      headers: fetchUrl.headers,
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.coins) {
          setData(data.coins.map((eachCoin: any) => eachCoin.item));
        } else {
          setData([]);
        }
      })
      .catch(() => {
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
        pageSizeOptions={[10, 20]}
        disableColumnFilter
        disableColumnMenu
        rowHeight={75}
      />
    </div>
  );
};

export default TrendList;
