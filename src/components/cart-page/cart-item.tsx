import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import Counter from '@components/ui/counter';
import { productPlaceholder } from '@assets/placeholders';

interface CartItemProps {
  item: any;
  openProductDrawer: Function;
}

const CartItem: React.FC<CartItemProps> = ({ item, openProductDrawer }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart, items } =
    useCart();

  const increaseQuantity = () => {
    const quantity =
      (items.find((data) => data.id === item.id)?.quantity || 0) + 1;

    addItemToCart(item, quantity);
  };

  return (
    <div
      className={`group w-full h-[110px] flex justify-start items-center bg-skin-fill py-4 md:py-7 border-b border-skin-one dark:border-darkSeperatingBorder border-opacity-70 relative`}
      //   "last:border-b-0" => this will hide last item's border
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden flex-shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={item?.image ?? productPlaceholder}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-skin-thumbnail"
        />
        <div
          className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-gray-200 text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex w-full overflow-hidden items-start justify-between cursor-pointer select-none">
        <div className="ps-3 md:ps-4" onClick={() => openProductDrawer(item)}>
          <div className="block text-skin-base text-13px sm:text-sm lg:text-15px transition-all leading-5 hover:text-skin-primary dark:text-darkText">
            {item?.name}
          </div>
          <div className="text-13px sm:text-sm text-skin-muted mt-1.5 block mb-2 dark:text-darkText">
            Rs. {item.price.toFixed(2)} X {item.quantity}
          </div>
          <div className="text-xs truncate w-28 sm:w-72 md:w-80 lg:w-40 xl:w-72 2xl:w-80 pr-2">
            {item?.remarks || ''}
          </div>
        </div>

        <div>
          <div className="flex font-semibold text-sm md:text-base text-skin-base leading-5 flex-shrink-0 min-w-[65px] md:min-w-[80px] justify-end dark:text-darkText">
            Rs.{item?.itemTotal.toFixed(2)}
          </div>
          <div className="mt-[25px] pr-[3.5px]">
            <Counter
              value={item.quantity}
              onIncrement={increaseQuantity}
              onDecrement={() => removeItemFromCart(item.id)}
              variant="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
