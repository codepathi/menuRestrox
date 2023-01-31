import { OrderDetailsContent } from '@components/order/order-details-content';
import PreviousOrderLayout from '@components/previous-order/previous-order-layout';
import { useSingleOrderQuery } from '@framework/order/get-single-order';
import { useEffect, useState } from 'react';

function SinglePreviousOrder(params: any) {
  const { orderId } = params;
  const { data, isLoading, isError } = useSingleOrderQuery({ orderId });
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const totalPrice =
    data?.order?.items.reduce((previousvalue: number, currentData: any) => {
      if (currentData?.status === 'cancelled') return previousvalue;

      return previousvalue + (currentData.price * currentData.quantity || 1);
    }, 0) | 0;

  useEffect(() => {
    if (!data?.order?.items) return;
    const quantity = data.order.items.reduce(
      (previousValue: number, currentData: any) =>
        previousValue + currentData.quantity,
      0
    );
    setTotalQuantity(quantity);
  }, [data]);

  if (isLoading || isError) {
    return (
      <PreviousOrderLayout>
        <h1>{isLoading ? 'Loading...' : 'Invalid order id'}</h1>
      </PreviousOrderLayout>
    );
  }

  return (
    <PreviousOrderLayout>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Order Details</h2>

        <div className="grid grid-cols-12 bg-skin-two py-3 rounded-[3px] text-black text-[12px] md:text-[14px]">
          <div className="col-span-2 opacity-50"></div>
          <div className="col-span-5 opacity-50">Items Name</div>
          <div className="col-span-3 opacity-50 md:text-start text-center">
            Quantity
          </div>
          <div className="col-span-2 opacity-50">Price</div>
        </div>

        {data?.order?.items.map((data: any, index: number) => (
          <OrderDetailsContent key={index} item={data} />
        ))}

        <div className="mt-3 text-end">
          <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
            <p className="flex justify-between ps-20 mb-3 font-bold">
              <span className="me-8">Total Quantity:</span>
              <span>{totalQuantity}</span>
            </p>

            <p className="flex justify-between ps-20 mb-5 font-bold">
              <span className="me-8">Total Cost:</span>
              <span>Rs. {totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </PreviousOrderLayout>
  );
}
export default SinglePreviousOrder;

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }: any) {
  return { props: { orderId: params.id } };
}
