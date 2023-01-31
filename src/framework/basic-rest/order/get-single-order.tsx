import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';

interface OrderParams {
  restaurantId: any;
  orderId: any;
}

interface OrderQueryType {
  orderId: any;
}

export const fetchSingleOrder = async ({
  restaurantId,
  orderId,
}: OrderParams) => {
  if (!orderId) {
    throw new Error('Invalid order id');
  }

  if (!restaurantId) {
    throw new Error('Restaurant id does not exist');
  }

  const response = await base.get(
    `v2/restaurant/${restaurantId}/order/${orderId}`
  );
  return response.data;
};

export const useSingleOrderQuery = ({ orderId }: OrderQueryType) => {
  const [restaurantId] = useLocalStorage('active_restaurant');
  return useQuery<any>(['singleOrder', orderId], () =>
    fetchSingleOrder({ restaurantId, orderId })
  );
};
