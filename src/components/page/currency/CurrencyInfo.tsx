import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseBtnComp from '../../shared/modal/CloseBtnComp';
import SparkLineChartComp from '../../shared/graph/SparkLineChartComp';
import Coin from '../../shared/page/Coin';
import { coingeckoApi } from '../../../providers/api/coingecko';
import axios from 'axios';
import { AlertComp } from '../../shared/message/AlertComp';

const CurrencyInfo = (props: {
  coinId: string;
  isOpen: boolean;
  onClose: any;
}) => {
  const { coinId, isOpen, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrl = coingeckoApi.coins.byId(coinId, {
      sparkline: true,
    });
    setIsLoading(true);
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
        setError('Something went wrong when get data');
        setData(undefined);
      });
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {error !== '' && <AlertComp msg={error} severity='error' />}

          <DialogTitle>
            <Coin
              name={data?.name}
              symbol={data?.symbol}
              image={data?.image?.thumb}
            />
          </DialogTitle>
          <CloseBtnComp onClose={onClose} />
          <DialogContent dividers>
            <Typography gutterBottom>{data?.description?.en}</Typography>

            <Typography variant='h6' gutterBottom>
              Current price : $ {data?.market_data?.current_price?.usd}
            </Typography>

            {data?.market_data?.sparkline_7d?.price && (
              <>
                <Typography variant='h5' gutterBottom>
                  Last 7 days history
                </Typography>
                <SparkLineChartComp
                  data={data?.market_data?.sparkline_7d?.price}
                  width={400}
                  height={200}
                  plotType='line'
                  border={1}
                />
              </>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default CurrencyInfo;
