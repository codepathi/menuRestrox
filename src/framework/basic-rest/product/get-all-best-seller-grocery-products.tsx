import { Product } from '@framework/types';
import base from '@framework/utils/baseUrl';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBestSellerGroceryProducts = async (restaurant: string) => {
  const { data } = await base.get(
    `${restaurant}/${API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS}`
  );

  return data as Product;
};

export const useBestSellerGroceryProductsQuery = (restaurant: string) => {
  return useQuery<Product, Error>(
    [API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS, restaurant],
    () => fetchBestSellerGroceryProducts(restaurant)
  );
};
