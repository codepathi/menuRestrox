import cn from 'classnames';
import Image from '@components/ui/image';
import { MenuItems } from '@framework/types';
import { AddToCart } from '@components/product/add-to-cart';
import { productPlaceholder } from '@assets/placeholders';
import { useEffect, useState } from 'react';
import { useCart } from '@contexts/cart/cart.context';

interface ProductProps {
  product: MenuItems;
  className?: string;
}

interface ProductCardType {
  product: MenuItems;
  className?: string;
  openProductDrawer: (data: MenuItems) => void;
}

function RenderPopupOrAddToCart({ product }: ProductProps) {
  return <AddToCart data={product} />;
}

const ProductCard: React.FC<ProductCardType> = ({
  product,
  className,
  openProductDrawer,
}) => {
  const { items } = useCart();
  const { images, itemName, variants, _id } = product ?? {};
  const [displayPrice, setDisplayPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [disountPercent, setDiscountPercent] = useState(0);
  const isSelectedItem = items.find((data) => data.id === _id);

  useEffect(() => {
    variants.map((itm) => {
      setDisplayPrice(itm.price);
      setDiscount(product.discount?.amount);
    });
  }, []);

  useEffect(() => {
    if (!displayPrice || !discount) return;
    const disPercent = (discount * 100) / displayPrice;
    if (disPercent) setDiscountPercent(disPercent);
  }, [displayPrice, discount]);

  function handleProductDrawer() {
    openProductDrawer(product);
  }

  return (

    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full dark:border dark:border-darkBorder p-4 bg-[#fcfcfc]',
        className,
        {
          'border-[1.5px] border-skin-primary': isSelectedItem,
        }
      )}
      onClick={handleProductDrawer}
      title={itemName}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            // src={images && images.length ? images[0] : productPlaceholder}
            src={
              // images && images.length
              //   ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads?imageUrl=${images[0]}&isAvatar=true`
              //   : 
                productPlaceholder
            }
            alt={itemName || 'Product Image'}
            width={200}
            height={200}
            quality={100}
            className="object-cover bg-skin-thumbnail rounded-lg"
          />
        </div>
        {/* <div className="w-full h-full absolute top-0 left-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          <div className="inline-block product-count-button-position">
            <RenderPopupOrAddToCart product={product} />
          </div>
        </div> */}

        <div className="absolute bottom-0 right-0">
          <RenderPopupOrAddToCart product={product} />
        </div>
      </div>

      <div className="flex flex-col h-full pt-2">
        <span className="inline-block font-medium text-[1rem] lg:text-base dark:text-darkText text-gray-600">
          {itemName}
        </span>

        <div className="mt-[-6px]">
          <span className="inline-block text-[0.6rem] dark:text-darkText text-gray-600">
            {product?.categories
              ? product?.categories[0]?.categoryId?.categoryName
              : ''}
          </span>
        </div>

        <div className="mt-1">
          <p className="text-skin-base text-[0.8rem] font-medium sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 dark:text-darkText">
            Rs.{Math.round(displayPrice - discount)}
          </p>
        </div>

        {discount ? (
          <>
            <p className="p-0 m-0 -mt-2 ">
              <del className="font-thin text-[0.6rem] text-gray-500">
                Rs. {displayPrice.toFixed(2)}
              </del>
              <span className="ml-3 text-sm font-thin text-gray-500">
                {disountPercent.toFixed(2)}%
              </span>
            </p>
          </>
        ) : null}
      </div>
      {/* <div className="w-full h-full absolute bottom-3 right-2 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
        <div className="inline-block product-count-button-position">
          <RenderPopupOrAddToCart product={product} />
        </div>
      </div> */}
    </article>
  );
};

export default ProductCard;
