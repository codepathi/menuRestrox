import usePrice from '@framework/product/use-price';
import { calculateTotal } from '@contexts/cart/cart.utils';

export const TotalPrice: React.FC<{ totalPrice: number }> = ({
  totalPrice,
}) => {
  return <span className="total_price">Rs. {totalPrice}</span>;
};

export const DiscountPrice = (discount: any) => {
  const { price } = usePrice({
    amount: discount?.discount,
    currencyCode: 'USD',
  });
  return <>-{price}</>;
};

export const DeliveryFee = (delivery: any) => {
  const { price } = usePrice({
    amount: delivery?.delivery,
    currencyCode: 'USD',
  });
  return <>{price}</>;
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const { price } = usePrice({
    amount: calculateTotal(items),
    currencyCode: 'USD',
  });
  return <>{price}</>;
};
