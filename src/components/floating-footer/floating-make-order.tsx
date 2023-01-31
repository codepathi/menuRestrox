import { useCart } from '@contexts/cart/cart.context';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

const FloatingMakeOrder = () => {
  const router = useRouter();
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const { isEmpty, items, total } = useCart();
  const totalQuantity = items.reduce(
    (previousValue, currentValue: any) => previousValue + currentValue.quantity,
    0
  );

  function redirectToCartPage() {
    const cartPageLink = `/restaurant/${activeRestaurant}/table/${activeTable}/cart`;
    router.push(cartPageLink);
  }

  return (
    <div>
      {!isEmpty ? (
        <div
          className="fixed bottom-0 left-0 z-20 py-5 px-3 bg-white shadow-md rounded-md"
          style={{ width: 'calc(100vw - 65px)' }}
        >
          <div className="grid grid-cols-2">
            <div className="text-black">
              <p className="p-0 m-0 font-semibold text-gray-800">
                Rs. {total.toFixed(2)}
              </p>
              <p className="p-0 m-0 mt-1 text-xs text-gray-700">
                QTY: {totalQuantity}
              </p>
            </div>
            <button
              className="text-white ml-auto bg-skin-primary rounded-md shadow-xl "
              style={{ padding: '9px 30px' }}
              onClick={redirectToCartPage}
            >
              Order Now
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FloatingMakeOrder;
