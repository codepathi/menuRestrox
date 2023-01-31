import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';

interface Props {
  data: any;
}

export const AddToCart = ({ data }: Props) => {
  const { width } = useWindowSize();
  const {
    addItemToCart,
    removeItemFromCart,
    getItemFromCart,
    isInCart,
    items,
  } = useCart();

  const getNormalizedItemData = (itemData: any) => {
    // Finding the default variant data

    const defaultVariant = itemData?.variants.find(
      (veriant: any) => veriant.name === 'default'
    );

    const cartData = {
      id: itemData?._id ? itemData._id : '',
      slug: '',
      name: itemData?.itemName ? itemData.itemName : '',
      price: defaultVariant ? defaultVariant.price : 0,
      discount: itemData?.discount.amount ? itemData?.discount.amount : 0,
      unit: '',
      variantId: defaultVariant?._id ? defaultVariant._id : '',
      image: itemData?.images[0],
      remarks: '',
    };

    // This is for the temporany solution. For more detail visit to product-drawer.tsx file

    const veri: any = undefined;
    return generateCartItem(cartData, veri, itemData);
  };

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    const quantity =
      (items.find((item) => item.id === data._id)?.quantity || 0) + 1;

    addItemToCart(getNormalizedItemData(data), quantity);
  };

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(data?._id);
  };

  const iconSize = width! > 480 ? '15' : '17';
  return !isInCart(data?._id) ? (
    <button
      className="bg-skin-primary rounded-md w-7 lg:w-8 h-7 lg:h-8 text-skin-inverted text-4xl flex items-center justify-center focus:outline-none"
      aria-label="Count Button"
      onClick={handleAddClick}
      disabled={false}
    >
      <PlusIcon width={iconSize} height={iconSize} opacity="1" />
    </button>
  ) : (
    <Counter
      value={getItemFromCart(data._id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={false}
    />
  );
};
