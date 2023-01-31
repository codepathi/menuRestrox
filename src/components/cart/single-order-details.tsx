import { AiOutlineArrowLeft } from 'react-icons/ai';
import { OrderDetailsContent } from '@components/order/order-details-content';
import { TotalPrice } from '@components/order/price';
import { useUI } from '@contexts/ui.context';
import { useSingleOrderQuery } from '@framework/order/get-single-order';
import { useEffect } from 'react';

type SingleOrderDetailsProps = {
  id: null | number | string;
  closeOrderDetails: () => void;
};

const SingleOrderDetails = ({
  id: orderId,
  closeOrderDetails,
}: SingleOrderDetailsProps) => {
  const { closeDrawer, displayDrawer, drawerView } = useUI();

  const {
    data: orderDetails,
    isLoading,
    isError,
    refetch,
  } = useSingleOrderQuery({ orderId });

  useEffect(() => {
    if (true && drawerView === 'CART_SIDEBAR') {
      refetch();
    }
  }, [displayDrawer]);

  const totalPrice =
    orderDetails?.order?.items.reduce(
      (previousvalue: number, currentData: any) => {
        if (currentData?.status === 'cancelled') return previousvalue;

        return previousvalue + (currentData.price * currentData.quantity || 1);
      },
      0
    ) | 0;

  return (
    <div className="w-full px-5 md:px-7 bg-white">
      <div className="sticky top-0 w-full pt-5 pb-3 bg-white z-10">
        <div className="flex justify-between">
          <div>
            <AiOutlineArrowLeft
              className="mt-3 font-black text-gray-700 text-xl cursor-pointer"
              onClick={() => closeOrderDetails()}
            />
          </div>
          {/* <div className="font-black text-gray-700 text-2x">
            <IoClose
              className="mt-2 font-black text-gray-600 text-2xl cursor-pointer"
              onClick={closeDrawer}
            />
          </div> */}
        </div>
      </div>

      {isLoading && <div className="mt-5 text-center">Loading...</div>}
      {/* {isError && (
        <div className="mt-5 text-center text-red-500">Invalid order id</div>
      )} */}

      {!isLoading && !isError && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>

          {/* <OrderStatus status={data?.status?.serial} /> */}

          <div className="grid grid-cols-12 bg-skin-two py-3 rounded-[3px] text-black text-[12px] md:text-[14px]">
            <div className="col-span-2 opacity-50"></div>
            <div className="col-span-5 opacity-50">Items Name</div>
            <div className="col-span-3 opacity-50 md:text-start text-center">
              Quantity
            </div>
            <div className="col-span-2 opacity-50">Price</div>
          </div>

          {orderDetails?.order?.items.map((data: any, index: number) => (
            <OrderDetailsContent key={index} item={data} />
          ))}

          <div className="mt-3 text-end">
            <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
              {/* <div className="mb-2 pb-1 border-b border-skin-base ps-20"> */}
              {/* <p className="flex justify-between mb-1">
                  <span className="me-8">Sub total: </span>
                  <span className="font-medium">
                    <SubTotalPrice items={data?.products} />
                  </span>
                </p> */}
              {/* {typeof data?.discount === 'number' && (
                  <p className="flex justify-between mb-2">
                    <span className="me-8">Discount: </span>
                    <span className="font-medium">
                      <DiscountPrice discount={data?.discount} />
                    </span>
                  </p>
                )} */}
              {/* {typeof data?.delivery_fee === 'number' && (
                  <p className="flex justify-between mb-2">
                    <span className="me-8">Delivery Fee:</span>
                    <span className="font-medium">
                      <DeliveryFee delivery={data?.delivery_fee} />
                    </span>
                  </p>
                )} */}
              {/* </div> */}
              <p className="flex justify-between ps-20 mb-5 font-bold">
                <span className="me-8">Total Cost:</span>
                <span className="font-medium">
                  <TotalPrice totalPrice={totalPrice} />
                </span>
              </p>
            </div>
          </div>
          {/* <div className="text-end mt-12">
            <span className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-medium bg-[#F35C5C] rounded border border-solid border-[#F35C5C]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize">
              Delete Order
            </span>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SingleOrderDetails;
