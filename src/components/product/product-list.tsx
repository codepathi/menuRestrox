import { Items, MenuItems } from '@framework/types';
import { useEffect, useState } from 'react';
import ProductDrawer from './product-drawer';
import { useInView } from 'react-intersection-observer';
import { useProductByCategoryQuery } from '@framework/product/get-all-products-by-category';
import Container from '@components/ui/container';
import { useCart } from '@contexts/cart/cart.context';
import classNames from 'classnames';

type ProductListTypes = {
  restaurantId: string;
  activeCategory: string;
  setActiveCategory: Function;
};

type ProductItemPropsTypes = {
  data: Items;
};

type DataFetchingParamsType = {
  categoryId: string | null;
  restaurantId: string | null;
  lastItemDate: string | null;
  isEnabledQuery: boolean;
  isInitialDataLoading: boolean;
};

const initialDataFetchingParams: DataFetchingParamsType = {
  categoryId: null,
  restaurantId: null,
  lastItemDate: null,
  isEnabledQuery: false,
  isInitialDataLoading: true,
};

const ProductItem = ({ data }: ProductItemPropsTypes) => {
  const { items } = useCart();
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [isProductDrawerDisplay, setIsProductDrawerDisplay] =
    useState<boolean>(false);

  useEffect(() => {
    let disocunt = 0;

    if (!data.variants.length) return;

    if (data.discount?.amount) {
      disocunt = data.discount.amount;
    }
    if (data.discount?.percent) {
      const discountInAmount =
        (data.variants[0].price * data.discount.percent) / 100;
      disocunt = discountInAmount;
    }

    setOriginalPrice(data.variants[0].price - disocunt);
  }, []);

  const handleClick = () => {
    setIsProductDrawerDisplay(true);
  };

  const getItemCartData = () => {
    const itemIndex = items.findIndex(
      (item) => item?.itemRawData?._id === data._id
    );

    if (itemIndex < 0) return { isItemExisted: false, data: null };
    return { isItemExisted: true, data: items[itemIndex] };
  };

  return (
    <div>
      <div className="flex mt-2 cursor-pointer" onClick={handleClick}>
        <div className="flex-grow-0">
          <span className="text-sm">
            {data.itemName}
            {getItemCartData().isItemExisted ? (
              <span className="font-bold ml-1">
                ({getItemCartData().data?.quantity})
              </span>
            ) : (
              ''
            )}
          </span>
        </div>
        <div
          className={classNames('flex-grow my-border-bottom', {
            'border-red-200': getItemCartData().isItemExisted,
          })}
        ></div>

        <div className="flex-grow-0">
          <span className="text-sm"> Rs. {originalPrice.toFixed(2)}</span>
        </div>
      </div>
      <ProductDrawer
        open={isProductDrawerDisplay}
        setOpen={setIsProductDrawerDisplay}
        itemData={data}
      />
    </div>
  );
};

const ProductList = ({ restaurantId, activeCategory }: ProductListTypes) => {
  const { ref, inView } = useInView();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  useState<boolean>(false);
  const [products, setProducts] = useState<MenuItems[]>([]);
  const [dataFetchingParams, setDataFetchingParams] =
    useState<DataFetchingParamsType>(initialDataFetchingParams);
  const { data, isLoading, refetch, isPreviousData, isFetching } =
    useProductByCategoryQuery(dataFetchingParams);

  useEffect(() => {
    if (dataFetchingParams.isInitialDataLoading) {
      refetch();
      setDataFetchingParams({
        ...dataFetchingParams,
        isInitialDataLoading: false,
      });
    }
  }, [dataFetchingParams]);

  useEffect(() => {
    if (!restaurantId || !activeCategory) return;
    setDataFetchingParams({
      ...dataFetchingParams,
      categoryId: activeCategory,
      restaurantId: restaurantId,
      lastItemDate: null,
      isEnabledQuery: true,
      isInitialDataLoading: true,
    });
    setIsAllDataLoaded(false);
  }, [activeCategory, restaurantId]);

  useEffect(() => {
    if (inView && !isLoading) {
      setDataFetchingParams({
        ...dataFetchingParams,
        lastItemDate: data?.lastItemDate ? data.lastItemDate : null,
      });
    }
  }, [inView]);

  useEffect(() => {
    if (!data) return;

    if (!dataFetchingParams.lastItemDate) {
      setProducts(data.menuItemList);
      if (!data?.lastItemDate) setIsAllDataLoaded(true);
      return;
    }

    if (isPreviousData) return;

    if (!data?.lastItemDate) setIsAllDataLoaded(true);

    setProducts([...products, ...data.menuItemList]);
  }, [data]);

  // Return loading if initial data is not loaded

  if (isLoading && !products.length) {
    return (
      <div>
        <h1 className="text-center mt-5">Loading...</h1>
      </div>
    );
  }

  return (
    <Container className="mt-7 mx-auto">
      {products.length ? (
        <h1 className="text-xl font-bold">Items List</h1>
      ) : (
        <h1 className="text-xl font-bold">No item found</h1>
      )}

      <div className="mt-5">
        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-3">
          {products &&
            products.map((data, index) => (
              <ProductItem data={data} key={index} />
            ))}
        </div>
      </div>

      {!isAllDataLoaded && !isFetching && (
        <div ref={ref}>
          <h2 className="text-center my-3">Loading...</h2>
        </div>
      )}
    </Container>
  );
};

export default ProductList;
