import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import base from '@framework/utils/baseUrl';
import { useLocalStorage } from '@utils/use-local-storage';

export const fetchProduct = async (slug: string, restaurant: string) => {
  const response = await base.get(
    `${restaurant}/${API_ENDPOINTS.PRODUCT}/${slug}`
  );

  return response.data;
};

export const useProductQuery = (slug: string) => {
  const [restaurant] = useLocalStorage<string>('restaurant');
  return useQuery(
    [API_ENDPOINTS.PRODUCT, slug],
    () => fetchProduct(slug, restaurant ? restaurant : ''),
    {
      enabled: false,
    }
  );
};
