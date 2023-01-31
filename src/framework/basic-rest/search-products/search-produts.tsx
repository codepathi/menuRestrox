import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';
import { MenuItems } from '@framework/types';

type searchProductsTypes = {
  searchKey: string;
  restaurantId: string;
};

export const searchProducts = async ({
  searchKey,
  restaurantId,
}: searchProductsTypes) => {
  const response = await base.get(
    `v2/restaurant/${restaurantId}/menu/active/items?query=${searchKey}`
  );
  return response.data.menuItemList as MenuItems[];
};

export const useSearchProductsQuery = (searchKey: string) => {
  const [restaurantId] = useLocalStorage('active_restaurant');
  return useQuery<MenuItems[]>(
    ['searchProducts', searchKey],
    () =>
      searchProducts({ searchKey: searchKey, restaurantId: `${restaurantId}` }),
    {
      enabled: false,
    }
  );
};
