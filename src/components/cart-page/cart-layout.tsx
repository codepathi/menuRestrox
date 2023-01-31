import Heading from '@components/ui/heading';
import { useCart } from '@contexts/cart/cart.context';
import makeOrder from '@framework/order/make-order';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import useWindowSize from '@utils/use-window-size';
import ClearCartModal from './clear-cart-modal';
import { useQueryClient } from 'react-query';

interface OrderDataType {
  itemId: string | number;
  variantId: string | number;
  quantity: number;
}

const CartLayout: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { width } = useWindowSize();
  const { isEmpty, resetCart, total, items, totalItems } = useCart();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function removeDataFromCart() {
    resetCart();
    setIsClearModalOpen(false);
    router.push(getHomePageLink());
  }

  function redirectTosingleOrderItem(orderId: string) {
    router.push(`${getHomePageLink()}/previous-order/${orderId}`);
  }

  async function proceedToCheckout() {
    setIsSubmitted(true);
    const normalizedOrderData = Array.from(items, (element) => {
      return {
        itemId: element.id,
        variantId: element.variantId,
        quantity: element.quantity,
        remarks: element?.remarks ? element?.remarks : '',
      };
    });

    try {
      if (!activeRestaurant || !activeTable) {
        toast('Invalid restaurant id or table id', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const orderResData = await makeOrder({
        restaurantId: `${activeRestaurant}`,
        tableId: `${activeTable}`,
        orderData: normalizedOrderData as OrderDataType[],
      });

      toast('Order Placed', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      resetCart();
      queryClient.invalidateQueries(['previousOrder']);
      redirectTosingleOrderItem(orderResData.orderId);
    } catch (e: any) {
      toast(
        e?.response?.data?.message ||
          'Something went wrong. Please try again later.',
        {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setIsSubmitted(false);
    }
  }

  return (
    <>
      <div>
        <div className="fixed top-0 bg-white w-full z-10">
          <div className="flex px-6 py-5">
            <Link href={getHomePageLink()}>
              <AiOutlineArrowLeft className="flex-none font-black text-gray-700 text-xl cursor-pointer mt-1" />
            </Link>
            <div className="flex-grow">
              <Heading variant="titleMedium">
                <div className="text-center">Your Cart</div>
              </Heading>
            </div>
            <div className="flex-none ">
              {!isEmpty && (
                <div>
                  <button
                    className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none opacity-90 hover:opacity-100 text-red-700"
                    aria-label="Clear All"
                    onClick={() => setIsClearModalOpen(true)}
                  >
                    <TrashIcon className="h-5 dark:text-darkText" />
                    <span className="ps-1 dark:text-darkText">Clear All</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 pt-20 pb-[140px]">{children}</div>
        {!isEmpty ? (
          <div className="fixed bottom-0 w-full px-5 py-4 bg-white">
            <div className="grid grid-cols-2">
              <h1 className="text-[0.8rem] font-bold">QTY :</h1>
              <h1 className="text-right text-[0.8rem] font-bold">
                {totalItems}
              </h1>
            </div>
            <div className="grid grid-cols-2 mt-2">
              <h1 className="font-bold">Total :</h1>
              <h1 className="text-right font-bold">Rs. {total.toFixed(2)}</h1>
            </div>
            {!isSubmitted ? (
              <button
                className="mt-3 w-full bg-skin-primary py-3 text-white rounded-md"
                onClick={proceedToCheckout}
              >
                Place Your Order
              </button>
            ) : (
              <button className="mt-3 w-full bg-skin-primary py-3 text-white rounded-md">
                Placing Your Order
              </button>
            )}
          </div>
        ) : null}
      </div>
      <ClearCartModal
        isOpen={isClearModalOpen}
        setIsOpen={() => setIsClearModalOpen(false)}
        handleSuccess={removeDataFromCart}
      />
    </>
  );
};

export default CartLayout;
