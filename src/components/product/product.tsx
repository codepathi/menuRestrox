import { useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { getVariations } from '@framework/utils/get-variations';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';

interface Props {
  data: any;
}

const ProductSingleDetails: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();

  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;

  const [displayPrice, setDisplayPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [disountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    data?.item.variants.map((itm: any) => {
      setDisplayPrice(itm.price);
    });
    const discountAmount = data?.item?.discount?.amount;
    if (discountAmount) setDiscountPrice(discountAmount);
  }, [data]);

  useEffect(() => {
    if (!displayPrice || !discountPrice) return;
    const disPercent = (discountPrice * 100) / displayPrice;
    if (disPercent) setDiscountPercent(disPercent);
  }, [displayPrice, discountPrice]);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data, selectedVariation);

  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const dat = {
      id: data?.item._id,
      slug: 'string',
      name: data?.item?.itemName,
      price: data?.item?.variants.filter((variant: any) => {
        if (variant.name === 'default') {
          return data;
        }
      })[0].price,
      discount: data?.item.discount.amount,
      unit: data?.item?.variants.filter((variant: any) => {
        if (variant.name === 'default') {
          return data;
        }
      })[0].price,
      quantity: selectedQuantity,
      variantId: data?.item?.variants.filter((variant: any) => {
        if (variant.name === 'default') {
          return data;
        }
      })[0]._id,
      image: data?.item?.images[0],
    };

    const item = generateCartItem(dat, selectedVariation);

    addItemToCart(item, selectedQuantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function addToWishlist() {
    // To show btn feedback while product wishlist

    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
        <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          <div className="w-auto flex items-center justify-center">
            <Image
              src={data?.item?.images[0]}
              alt={data?.name!}
              objectFit="contain"
              width={900}
              height={680}
            />
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300 dark:text-darkText">
                {data?.item.itemName}
              </h2>
            </div>

            {isEmpty(variations) && (
              <div className="flex items-center mt-5">
                <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px] dark:text-darkText">
                  Rs. {displayPrice - discountPrice}
                </div>

                {discountPrice ? (
                  <>
                    <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50 dark:text-darkText">
                      {displayPrice}
                    </del>

                    <span className="inline-block rounded font-bold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ms-2.5">
                      {`${disountPercent.toFixed(2)}%`} {t('text-off')}
                    </span>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })}

          <div className="pb-2">
            {!isEmpty(selectedVariation) && (
              <span className="text-sm font-medium text-skin-yellow-two">
                {selectedVariation?.is_disable ||
                selectedVariation.quantity === 0
                  ? t('text-out-stock')
                  : `${
                      t('text-only') +
                      ' ' +
                      selectedVariation.quantity +
                      ' ' +
                      t('text-left-item')
                    }`}
              </span>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                onClick={addToWishlist}
                loading={addToWishlistLoader}
                className={`group hover:text-skin-primary dark:bg-darkBg ${
                  favorite === true && 'text-skin-primary'
                }`}
              >
                {favorite === true ? (
                  <IoIosHeart className="text-2xl md:text-[26px] me-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary dark:text-darkText" />
                )}
                <div className="dark:text-darkText">{t('text-wishlist')}</div>
              </Button>
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-skin-primary dark:bg-darkBg ${
                    shareButtonStatus === true && 'text-skin-primary'
                  }`}
                  onClick={handleChange}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary dark:text-darkText" />
                  <div className="dark:text-darkText"> {t('text-share')}</div>
                </Button>
                <SocialShareBox
                  className={`absolute z-10 end-0 w-[300px] md:min-w-[400px] transition-all duration-300${
                    shareButtonStatus === true
                      ? 'visible opacity-100 top-full'
                      : 'opacity-0 invisible top-[130%]'
                  }`}
                  shareUrl={productUrl}
                />
              </div>
            </div>
          </div>
          {data?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="me-2" /> {t('text-tags')}:
              </li>
              {data?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex space-x-2 mx-auto mt-5">
        <div className="w-1/2">
          <Counter
            variant="single"
            value={selectedQuantity}
            onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
            onDecrement={() =>
              setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
            }
            disabled={
              isInCart(item.id)
                ? getItemFromCart(item.id).quantity + selectedQuantity >=
                  Number(item.stock)
                : selectedQuantity >= Number(item.stock)
            }
          />
        </div>
        <div className="w-1/2">
          <Button
            onClick={addToCart}
            className="w-full px-1.5"
            disabled={!isSelected}
            loading={addToCartLoader}
          >
            <CartIcon color="#ffffff" className="me-3" />
            {t('text-add-to-cart')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;
