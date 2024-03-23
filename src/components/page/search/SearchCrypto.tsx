import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { coingeckoApi } from '../../../providers/api/coingecko';
import { useState } from 'react';
import { CryptoDataType } from '../../../config/general';
import GroupHeader from '../../shared/autoComplete/GroupHeader';
import GroupItems from '../../shared/autoComplete/GroupItems';
import Box from '@mui/material/Box';
import ListIcon from '@mui/icons-material/List';
import { AlertComp } from '../../shared/message/AlertComp';
import axios from 'axios';

const SearchCrypto = () => {
  const [error, setError] = useState('');
  const [options, setOptions] = useState<any>([]);

  const prepareOption = (data: any): Array<any> => {
    const coins: Array<any> = data?.coins.map((eachCoin: any) => {
      return {
        type: CryptoDataType.COIN,
        ...eachCoin,
      };
    });

    const category: Array<any> = data?.categories.map((eachCategory: any) => {
      return {
        type: CryptoDataType.Category,
        ...eachCategory,
      };
    });

    return coins.concat(category);
  };

  const onInputChange = (event: React.SyntheticEvent, option: string) => {
    const fetchUrl = coingeckoApi.search(option);
    axios(fetchUrl.url, {
      headers: fetchUrl.headers,
      params: fetchUrl.data,
    })
      .then((data) => {
        setError('');
        setOptions(prepareOption(data.data));
      })
      .catch(() => {
        setError('Something went wrong when get data');
        setOptions([]);
      });
  };

  return (
    <>
      <Autocomplete
        id='crypto-search-auto-complete'
        options={options}
        groupBy={(option: any) => option.type}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} placeholder='Search Coins, catogry here' />
        )}
        onInputChange={onInputChange}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>
              {Number(params.group) === CryptoDataType.COIN
                ? 'Coins'
                : 'Category'}
            </GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderOption={(props, option) => {
          return (
            <Box
              component='li'
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option?.thumb ? (
                <img loading='lazy' width='20' src={option.thumb} alt='' />
              ) : (
                <ListIcon />
              )}
              {option?.name}
            </Box>
          );
        }}
      />

      {error && <AlertComp msg={error} />}
    </>
  );
};

export default SearchCrypto;
