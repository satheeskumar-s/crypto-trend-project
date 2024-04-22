export const formatPrice = (price: number, currency?: string) => {
  return `${currency || '$'} ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
