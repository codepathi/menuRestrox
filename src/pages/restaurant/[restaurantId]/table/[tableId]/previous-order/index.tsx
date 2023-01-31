import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import { useEffect, useState } from 'react';
import PreviousOrderItem from '@components/previous-order/previous-order-item';
import PreviousOrderLayout from '@components/previous-order/previous-order-layout';
import EmptyCart from '@components/cart-page/empty-cart';

const PreviousOrder = () => {
  const { data, isLoading, isError, isPreviousData, refetch } =
    usePreviousOrderQuery();
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    if (isPreviousData) return;
    setOrderList(data?.orders ? data.orders : []);
  }, [data]);

  if (isLoading || isError) {
    return (
      <PreviousOrderLayout>
        <h1>{isLoading ? 'Loading....' : 'Something went wrong...'}</h1>
      </PreviousOrderLayout>
    );
  }

  if (!orderList.length) {
    return (
      <PreviousOrderLayout>
        <EmptyCart
          tittle="Your order is empty"
          subTittle="Please order some items"
        />
      </PreviousOrderLayout>
    );
  }

  return (
    <PreviousOrderLayout>
      {!isLoading && !orderList.length && (
        <EmptyCart
          tittle="Your order is empty"
          subTittle="Please order some item"
        />
      )}
      {orderList.length ? (
        <>
          <h1 className="mt-4 font-medium text-xl">Your Previous Order</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-7 gap-x-4 gap-y-4">
            {orderList &&
              orderList.map((orderItem) => {
                return (
                  <PreviousOrderItem
                    data={orderItem}
                    tableName={data?.table?.tableName}
                    key={`previousOrderItem${orderItem._id}`}
                  />
                );
              })}
          </div>
        </>
      ) : null}
    </PreviousOrderLayout>
  );
};

export default PreviousOrder;
