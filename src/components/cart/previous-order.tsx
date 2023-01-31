import { useUI } from '@contexts/ui.context';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import PreviousOrderItem from './previous-order-item';
import SingleOrderDetails from './single-order-details';
import { useCart } from '@contexts/cart/cart.context';
import EmptyCart from './empty-cart';

type PropsType = {
  setActiveCartPage: (activePace: 'CART' | 'PREVIOUS_ORDER') => void;
};

type SingleOrderDetailsType = {
  id: string | number | null;
  isDisplay: boolean;
};

const PreviousOrderLayout: React.FC<PropsType> = ({
  children,
  setActiveCartPage,
}) => {
  const { isEmpty } = useCart();

  return (
    <div className="w-full px-5 md:px-7 bg-[white]">
      <div className="sticky top-0 w-full pt-5 pb-3 bg-white">
        <div className="flex justify-between">
          <div>
            {!isEmpty ? (
              <AiOutlineArrowLeft
                className="mt-3 font-black text-gray-700 text-xl cursor-pointer"
                onClick={() => setActiveCartPage('CART')}
              />
            ) : null}
          </div>
          
        </div>
      </div>
      {children}
    </div>
  );
};

const PreviousOrder = ({ setActiveCartPage }: PropsType) => {
  const { displayDrawer, drawerView } = useUI();
  const [orderList, setOrderList] = useState<any[]>([]);

  const [singleOrderDisplay, setSingleOrderDisplay] =
    useState<SingleOrderDetailsType>({
      id: null,
      isDisplay: false,
    });
  const { data, isLoading, isError, isPreviousData, refetch } =
    usePreviousOrderQuery();

  useEffect(() => {
    if (true && drawerView === 'CART_SIDEBAR') {
      refetch();
    }
  }, [displayDrawer]);

  // Function to open single order list page

  const openSingleOrdereDisplay = (id: string) => {
    setSingleOrderDisplay({ id: id, isDisplay: true });
  };

  // Function to clonse single order list page

  const closeSingleOrderDisplay = () => {
    setSingleOrderDisplay({ id: null, isDisplay: false });
  };

  useEffect(() => {
    if (isPreviousData) return;
    setOrderList(data?.orders ? data.orders : []);
  }, [data]);

  if (singleOrderDisplay.isDisplay) {
    return (
      <SingleOrderDetails
        id={singleOrderDisplay.id}
        closeOrderDetails={closeSingleOrderDisplay}
      />
    );
  }

  return (
    <PreviousOrderLayout setActiveCartPage={setActiveCartPage}>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {isError && (
        <div>
          <p>Something went wrong</p>
        </div>
      )}

      {!isLoading && !orderList.length && <EmptyCart />}
      {orderList.length ? (
        <>
          <h1 className="mt-4 font-medium text-xl">Your Previous Order</h1>
          <div className="grid grid-cols-2 mt-7 gap-x-4 gap-y-4">
            {orderList &&
              orderList.map((orderItem, index) => {
                return (
                  <PreviousOrderItem
                    openOrderDetails={openSingleOrdereDisplay}
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
