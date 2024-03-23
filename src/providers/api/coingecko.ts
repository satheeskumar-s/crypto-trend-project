import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { GridSortModel } from '@mui/x-data-grid/models/gridSortModel';

const host = 'https://api.coingecko.com/api/v3/';

const prepareUrl = (
  endpoint: string
): {
  url: string;
  headers: Headers;
} => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Accept', 'application/json');

  return {
    url: `${host}${endpoint}`,
    headers: requestHeaders,
  };
};
export const coingeckoApi = {
  coins: {
    list: prepareUrl('coins/list'),
    byId: (id: string) => prepareUrl(`coins/${id}`),
    markets: (paginationModel: GridPaginationModel, sortModel: GridSortModel) =>
      prepareUrl(
        `coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d&precision=2&sparkline=true&page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}&order=${sortModel[0].field}_${sortModel[0].sort}`
      ),
  },
  categories: {
    markets: prepareUrl(`coins/categories`),
  },
  search: (text: string) => prepareUrl(`search?query=${text}`),
  trend: prepareUrl('search/trending'),
};
