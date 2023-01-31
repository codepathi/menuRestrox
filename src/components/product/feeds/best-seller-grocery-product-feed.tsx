import { FC, useEffect } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';
import { MenuItemList } from '@framework/types';

interface ProductFeedProps {
  className?: string;
  id: string;
  setRestaurantName: Function;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({
  className,
  id,
  setRestaurantName,
}) => {
  const { data, error } = useBestSellerGroceryProductsQuery(id as string);

  useEffect(() => {
    setRestaurantName(data?.restaurantName);
  }, [data]);

  return (
    <ProductsGridBlock
      sectionHeading=""
      className={className}
      uniqueKey="best-sellers"
      menuItems={undefined}
    />
  );
};
export default BestSellerGroceryProductFeed;
