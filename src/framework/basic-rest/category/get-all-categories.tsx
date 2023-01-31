import { CategoriesType, ErrorType } from '@framework/types';
import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';

export const fetchCategories = async (restaurantId: string | number) => {
  
  const response = await base.get(
    `v2/restaurant/${restaurantId}/menu/active/categories`
  );

  return response.data.categories;
};

export const useCategoriesQuery = (restaurantId: string | number) => {
  return useQuery<CategoriesType[], ErrorType>(['category'], () =>
    fetchCategories(restaurantId)
  );
};
