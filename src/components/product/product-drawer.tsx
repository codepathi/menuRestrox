import Drawer from 'rc-drawer';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import Counter from '@components/ui/counter';
import { MenuItems } from '@framework/types';
import { useCart } from '@contexts/cart/cart.context';
import {
  productPlaceholder,
  productLoadingPlaceholder,
} from '@assets/placeholders';
import { generateCartItem } from '@utils/generate-cart-item';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

type ProductDrawerType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  itemData: MenuItems | undefined | null;
  cartRemarks?: string;
};

const ProductDrawer = ({ open, setOpen, itemData }: ProductDrawerType) => {
  const { width } = useWindowSize();
  const { addItemToCart, items } = useCart();

  // States
  const [displayLoadingImg, setDisplayLoadingImg] = useState<boolean>(true);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [count, setCount] = useState<number>(1);
  const [remarks, setRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setDisplayLoadingImg(false);
      return;
    }
    const setLoadingImg = () => {
      setDisplayLoadingImg(true);
    };

    const updateLoadingImgState = setTimeout(setLoadingImg, 100);
    return () => {
      updateLoadingImgState;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setCount(1);
      setOriginalPrice(0);
      setRemarks('');
      return;
    }

    let disocunt = 0;

    if (!itemData?.variants.length) return;

    if (itemData.discount?.amount) {
      disocunt = itemData.discount.amount;
    }
    if (itemData.discount?.percent) {
      const discountInAmount =
        (itemData.variants[0].price * itemData.discount.percent) / 100;
      disocunt = discountInAmount;
    }

    setOriginalPrice(itemData.variants[0].price - disocunt);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setIsSubmitted(false);

    const selectedItem = items.find((data) => data.id === itemData?._id);
    if (!selectedItem) return;

    setCount(selectedItem?.quantity || 1);
    setRemarks(selectedItem?.remarks || '');
  }, [open]);

  // This use effect controls the display-time of the product drawer to prevent displaying previous image

  useEffect(() => {}, [open]);

  const onIncrement = () => {
    setCount(count + 1);
  };
  const onDecrement = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  const addToCart = () => {
    setIsSubmitted(true);
    const selectedVariation = {
      id: itemData?.variants[0]?._id ? itemData.variants[0]._id : '',
      title: itemData?.itemName ? itemData.itemName : '',
      price: itemData?.variants[0]?.price ? itemData.variants[0].price : 0,
      quantity: count,
    };

    const defaultVariant = itemData?.variants.find(
      (veriant) => veriant.name === 'default'
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
      remarks: remarks,
    };

    //----------------------------------------------------------------

    // This is for the temporany solution

    const veri: any = undefined;
    const item = generateCartItem(cartData, veri, itemData);

    // This will be used when variation will be implemented....

    // const item = generateCartItem(cartData, selectedVariation);

    //----------------------------------------------------------------

    addItemToCart(item, count);

    toast(`${itemData?.itemName} is added to the cart`, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      placement="bottom"
      level={null}
      handler={false}
      width="100vw"
      showMask={true}
      contentWrapperStyle={{
        background: 'transparent',
        boxShadow: 'none',
      }}
      className="bg-transparent"
    >
      <div className="max-w-6xl m-auto">
        <div className="pt-20" onClick={() => setOpen(false)} />
        <div className="flex justify-center">
          <div style={{ position: 'absolute', top: 30 }}>
            <Image
              src={
                displayLoadingImg
                  ? productLoadingPlaceholder
                  : itemData?.images.length
                  ? itemData?.images[0]
                  : productPlaceholder
              }
              width={120}
              height={120}
              objectFit="cover"
              className="rounded-full bg-gray-200"
            />
          </div>
        </div>

        <div className="w-full rounded-t-2xl bg-white">
          <div>
            <button className="float-end mt-5 mr-7">
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </button>
          </div>
          <div className="clear-both pt-14 pb-6">
            <h1 className="text-center font-medium text-2xl text-gray-800">
              {itemData?.itemName ? itemData?.itemName : ''}
            </h1>
            <h1 className="text-center mt-1 text-black">
              Rs. {originalPrice.toFixed(2)}
            </h1>
            <div className="flex justify-center mt-5">
              <Counter
                value={count}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                variant="large"
              />
            </div>
            <div className="mt-5 px-7 pb-4">
              <label className="mt-2" style={{ fontSize: '0.9rem' }}>
                Remarks
              </label>
              <input
                type="text"
                className="border w-full mt-2 px-1 py-2 rounded-sm"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
              {!isSubmitted ? (
                <button
                  className="w-full bg-skin-primary text-white mt-6 py-3 rounded-md"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full bg-skin-primary text-white mt-6 py-3 rounded-md"
                >
                  Adding to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
