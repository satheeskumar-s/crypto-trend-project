import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { GridSortModel } from '@mui/x-data-grid/models/gridSortModel';
import { RawAxiosRequestHeaders } from 'axios';

const host = 'https://api.coingecko.com/api/v3/';

const prepareUrl = (
  endpoint: string,
  data?: any
): {
  url: string;
  headers: RawAxiosRequestHeaders;
  data: any;
} => {
  // let requestHeaders: AxiosHeaders;
  // requestHeaders.set('Accept', 'application/json');
  // await requestHeaders.set('Accept', 'application/json');

  return {
    url: `${host}${endpoint}`,
    headers: {
      Accept: 'application/json',
    },
    data,
  };
};
export const coingeckoApi = {
  coins: {
    list: prepareUrl('coins/list'),
    byId: (id: string) => prepareUrl(`coins/${id}`),
    markets: (paginationModel: GridPaginationModel, sortModel: GridSortModel) =>
      prepareUrl(`coins/markets`, {
        precision: 2,
        vs_currency: 'usd',
        price_change_percentage: '1h,24h,7d',
        page: paginationModel.page + 1,
        per_page: paginationModel.pageSize,
        order: `${sortModel[0].field}_${sortModel[0].sort}`,
        sparkline: true,
      }),
  },
  categories: {
    markets: prepareUrl(`coins/categories`),
  },
  search: (text: string) =>
    prepareUrl(`search`, {
      query: text,
    }),
  trend: prepareUrl('search/trending'),
};
