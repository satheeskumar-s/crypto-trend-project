const host = 'https://api.coingecko.com/api/v3/';

const prepareUrl = (endpoint: string) => `${host}${endpoint}`;
export const coingeckoApi = {
  coins: {
    list: prepareUrl('list'),
    byId: (id: string) => prepareUrl(`coins/${id}`),
    markets: prepareUrl(`coins/markets?vs_currency=usd`),
  },
  search: prepareUrl('search'),
};
