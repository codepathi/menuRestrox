import base from '@framework/utils/baseUrl';

interface OrderDataType {
  itemId: string | number;
  variantId: string | number;
  quantity: number;
}

interface MakeOrderTypes {
  restaurantId: string | undefined;
  tableId: string | undefined;
  orderData: OrderDataType[];
}

const makeOrder = async ({
  restaurantId,
  tableId,
  orderData,
}: MakeOrderTypes) => {
  if (!restaurantId) throw 'Invalid restaurant id';
  if (!tableId) throw 'Invalid table id';

  const response = await base.post(`v2/restaurant/${restaurantId}/order`, {
    tableId: tableId,
    orders: orderData,
  });

  return response.data;
};

export default makeOrder;
