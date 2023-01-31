import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';

interface OrderParams {
  restaurantId: any;
  tableId: any;
}

export const fetchPreviousOrder = async ({
  restaurantId,
  tableId,
}: OrderParams) => {
  if (!restaurantId || !tableId) {
    throw new Error('Restaurant id table id does not exist');
  }
  const response = await base.get(
    `v2/restaurant/${restaurantId}/order/table/${tableId}`
  );
  return response.data;
};

export const usePreviousOrderQuery = () => {
  const [restaurantId] = useLocalStorage('active_restaurant');
  const [tableId] = useLocalStorage('active_table');

  return useQuery<any>(['previousOrder'], () =>
    fetchPreviousOrder({ restaurantId, tableId })
  );
};
