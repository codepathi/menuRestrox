import CartLayout from '@components/cart-page/cart-layout';
import CartItem from '@components/cart-page/cart-item';
import RedirectToPreviousOrderButton from '@components/cart-page/redirect-to-previous-order-button';
import ProductDrawer from '@components/product/product-drawer';
import { useCart } from '@contexts/cart/cart.context';
import { MenuItems } from '@framework/types';
import { useState } from 'react';
import EmptyCart from '@components/cart-page/empty-cart';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';

const emptyCartStyle = {
  emptyOrder: {
    height: `calc(100vh - 300px)`,
  },
  fullOrder: {
    height: `calc(100vh - 210px)`,
  },
};

function Cart() {
  const { items } = useCart();
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItems | undefined>();
  const { data: previousOrderData } = usePreviousOrderQuery();

  // Function to open product drawer

  function openProductDrawerHandler(item: any) {
    if (!item?.itemRawData || !Object.keys(item?.itemRawData || {}).length) {
      return;
    }
    setSelectedItem(item.itemRawData as MenuItems);
    setOpenProductDrawer(true);
  }

  if (items.length) {
    return (
      <>
        <CartLayout>
          <RedirectToPreviousOrderButton />
          <div className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
            {items &&
              items.map((item, index) => (
                <CartItem
                  item={item}
                  key={index}
                  openProductDrawer={openProductDrawerHandler}
                />
              ))}
          </div>
        </CartLayout>

        <ProductDrawer
          open={openProductDrawer}
          setOpen={setOpenProductDrawer}
          itemData={selectedItem}
        />
      </>
    );
  }

  return (
    <CartLayout>
      <RedirectToPreviousOrderButton />
      <div
        className={'flex items-center justify-center'}
        style={
          previousOrderData?.length
            ? emptyCartStyle.fullOrder
            : emptyCartStyle.emptyOrder
        }
      >
      <EmptyCart classname="h-[350px] px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center" />
      </div>
    </CartLayout>
  );
}

export default Cart;
