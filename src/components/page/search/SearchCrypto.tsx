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
import { CircularProgress, InputAdornment } from '@mui/material';
import { AutocompleteInputChangeReason } from '@mui/base/useAutocomplete/useAutocomplete';

const SearchCrypto = (props: {
  coinId: string;
  setCoinId: any;
  categoryId: string;
  setCategoryId: any;
}) => {
  const { setCoinId, setCategoryId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<any>([]);

  const prepareOption = (data: any): Array<any> => {
    const coins: Array<any> = data?.coins.map((eachCoin: any) => {
      return {
        type: CryptoDataType.COIN,
        ...eachCoin,
      };
    });

    //Cannot get category id here
    const category: Array<any> = [];
    // const category: Array<any> = data?.categories.map((eachCategory: any) => {
    //   return {
    //     type: CryptoDataType.Category,
    //     ...eachCategory,
    //   };
    // });

    return coins.concat(category);
  };

  const onInputChange = (
    event: React.SyntheticEvent,
    option: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') {
      setIsLoading(true);
      const fetchUrl = coingeckoApi.search(option);
      axios(fetchUrl.url, {
        headers: fetchUrl.headers,
        params: fetchUrl.data,
      })
        .then((data) => {
          setError('');
          setIsLoading(false);
          setOptions(prepareOption(data.data));
        })
        .catch(() => {
          setError('Something went wrong when get data');
          setIsLoading(false);
          setOptions([]);
        });
    }
  };

  const onChange = (event: any, value: any) => {
    if (value.type === CryptoDataType.COIN) {
      setCoinId(value.id);
    }
    if (value.type === CryptoDataType.Category) {
      setCategoryId(value.name);
    }
  };

  return (
    <>
      <Autocomplete
        id='crypto-search-auto-complete'
        sx={{
          pb: 3,
        }}
        options={options}
        groupBy={(option: any) => option.type}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Search Coins, catogry here'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && (
                    <InputAdornment position='end'>
                      <CircularProgress size={24} />
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
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
              key={option.id}
            >
              {option?.type === CryptoDataType.COIN ? (
                <img loading='lazy' width='20' src={option.thumb} alt='' />
              ) : (
                <ListIcon />
              )}
              {option?.name}
            </Box>
          );
        }}
        onChange={onChange}
      />

      {error && <AlertComp msg={error} />}
    </>
  );
};

export default SearchCrypto;
