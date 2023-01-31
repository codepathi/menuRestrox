import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@utils/use-local-storage';
import { TrashIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import ClearAllCartModal from './clear-all-cart-modal';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import makeOrder from '@framework/order/make-order';

interface OrderDataType {
  itemId: string | number;
  variantId: string | number;
  quantity: number;
}

const CartLayout: React.FC = ({ children }) => {
  const { t } = useTranslation('common');
  const { closeDrawer, displayDrawer } = useUI();
  const { total, isEmpty, items, resetCart } = useCart();
  const [activeRestaurantId] = useLocalStorage<string>('active_restaurant');
  const [activeTableId] = useLocalStorage<string>('active_table');
  const { width } = useWindowSize();
  const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const removeDataFromCart = () => {
    resetCart();
    setIsClearModalOpen(false);
  };

  useEffect(() => {
    if (displayDrawer) setIsSubmitted(false);
  }, [displayDrawer]);

  const proceedToCheckout = async () => {
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
      await makeOrder({
        restaurantId: activeRestaurantId,
        tableId: activeTableId,
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
      closeDrawer();
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

      closeDrawer();
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full justify-between ">
        <div className="flex px-6 py-5">
          <AiOutlineArrowLeft
            className="flex-none font-black text-gray-700 text-xl cursor-pointer mt-1"
            onClick={closeDrawer}
          />
          <div className="flex-grow">
            <Heading variant="titleMedium">
              <div className="text-center">Your Cart</div>
            </Heading>
          </div>
          <div className="flex-none ">
            {!isEmpty && (
              <button
                className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none opacity-90 hover:opacity-100 text-red-700"
                aria-label={t('Clear All')}
                onClick={() => setIsClearModalOpen(true)}
              >
                <TrashIcon className="h-5 dark:text-darkText" />
                <span className="ps-1 dark:text-darkText">
                  {t('Clear All')}
                </span>
              </button>
            )}
          </div>
        </div>

        {children}

        <div className="border-skin-base px-5 md:px-7 pt-1 md:pt-6 pb-5 md:pb-6 dark:bg-darkBg bottom-40 border-t border-darkSeperatingBorder">
          <div className="flex pb-5 md:pb-7 mt-3">
            <div className="pe-3">
              <Heading className="mb-2.5 dark:text-darkText">
                {t('Total')}:
              </Heading>
            </div>
            <div className="flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end dark:text-darkText ml-auto">
              Rs.{total.toFixed(2)}
            </div>
          </div>

          {!isSubmitted ? (
            <div
              className="flex flex-col -mt-5 cursor-pointer"
              onClick={proceedToCheckout}
            >
              <div
                className={cn(
                  'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90',
                  {
                    'cursor-not-allowed !text-opacity-25 bg-[#202529]': isEmpty,
                  }
                )}
              >
                <span className="text-white py-0.5">
                  {t('Place your Order')}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col -mt-5 cursor-pointer">
              <div
                className={cn(
                  'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90',
                  {
                    'cursor-not-allowed !text-opacity-25 bg-[#202529]': isEmpty,
                  }
                )}
              >
                <span className="text-white py-0.5">
                  {t('Placing your Order...')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ClearAllCartModal
        isOpen={isClearModalOpen}
        setIsOpen={() => setIsClearModalOpen(false)}
        handleSuccess={removeDataFromCart}
      />
    </>
  );
};

export default CartLayout;
