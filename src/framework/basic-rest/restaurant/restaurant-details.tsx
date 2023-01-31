import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';
import { RestaurantType } from '@framework/types';

export async function fetchRestaurantData(restaurantId: string) {
  if (!restaurantId.length) throw Error('Invalid restaurant id.');
  const response = await base.get(`restaurant/${restaurantId}`);
  return response.data.restaurant;
}

export function useRestaurantQuery() {
  const [activeRestaurant] = useLocalStorage('active_restaurant');

  return useQuery<RestaurantType>([activeRestaurant], () =>
    fetchRestaurantData(`${activeRestaurant}`)
  );
}
