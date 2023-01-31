import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { MenuItemsByCategory } from '@framework/types';

type FetchProductsByCatType = {
  categoryId: string | null;
  restaurantId: string | null;
  lastItemDate: string | null;
  isEnabledQuery?: boolean;
};

export const fetchProductsByCategory = async ({
  categoryId,
  restaurantId,
  lastItemDate,
}: FetchProductsByCatType) => {
  if (categoryId === 'all') {
    const response = await base.get(
      `v2/restaurant/${restaurantId}/menu/active/items${
        lastItemDate ? `?lastItemDate=${lastItemDate}` : ''
      }`
    );

    return response.data as MenuItemsByCategory;
  }

  const response = await base.get(
    `v2/restaurant/${restaurantId}/menu/active/items?category=${categoryId}${
      lastItemDate ? `&lastItemDate=${lastItemDate}` : ''
    }`
  );

  return response.data as MenuItemsByCategory;
};

export const useProductByCategoryQuery = ({
  restaurantId,
  categoryId,
  lastItemDate,
  isEnabledQuery,
}: FetchProductsByCatType) => {
  return useQuery<MenuItemsByCategory, Error>(
    ['productsByCategory', lastItemDate, categoryId],
    () =>
      fetchProductsByCategory({
        restaurantId,
        categoryId,
        lastItemDate,
      }),
    {
      keepPreviousData: true,
      enabled: isEnabledQuery ? isEnabledQuery : false,
    }
  );
};
