import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import cn from 'classnames';
import { useLocalStorage } from 'react-use';
import Link from '@components/ui/link';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-skin-base text-opacity-40',
  hideLabel,
}) => {
  const { totalItems } = useCart();
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');

  function getCartPageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const cartPageLink = `/restaurant/${activeRestaurant}/table/${activeTable}/cart`;
    return cartPageLink;
  }

  return (
    <Link
      href={getCartPageLink()}
      className={cn(
        'flex items-center justify-center flex-shrink-0 h-auto focus:outline-none transform dark:text-darkText',
        className
      )}
      aria-label="cart-button"
    >
      <div className="flex items-center relative">
        <CartIcon className={cn(iconClassName)} />
        <span className="cart-counter-badge flex items-center justify-center bg-skin-primary text-skin-inverted absolute -top-2.5 start-2.5 rounded-full font-bold dark:text-darkText">
          {totalItems}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm lg:text-15px text-skin-base font-normal ms-2">
          Cart
        </span>
      )}
    </Link>
  );
};

export default CartButton;
