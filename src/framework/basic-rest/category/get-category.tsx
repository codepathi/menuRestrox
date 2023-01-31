import { QueryOptionsType, Category } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCategory = async ({ queryKey }: any) => {
  const dt: Category[] = [];
  return { category: { data: dt } };
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategory
  );
};

// THIS CATEGORY HAS NOT BEEN USED BUT SOME COMPONENTS USES IT, WHICH ARE NOT USED IN OUR PAGE: NEED REFINEMENT
