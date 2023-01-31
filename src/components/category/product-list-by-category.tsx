import { useEffect, useState } from 'react';
import ProductsGridBlock from '@components/product/products-grid-block';
import { useProductByCategoryQuery } from '@framework/product/get-all-products-by-category';
import { MenuItems } from '@framework/types';
import { useInView } from 'react-intersection-observer';

type PropsType = {
  activeCategory: string;
  restaurantId: string;
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
  isInitialDataLoading: false,
};

const ProductListByCategory = ({ activeCategory, restaurantId }: PropsType) => {
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
    setIsAllDataLoaded(true);
  }, [activeCategory, restaurantId]);


  // useEffect(() => {
    // if (inView && !isLoading) {
      // setDataFetchingParams({
      //   ...dataFetchingParams,
      //   lastItemDate: data?.lastItemDate ? data.lastItemDate : null,
      // });
    // }
  // }, [inView]);

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
    <div className="mt-8 mb-5">
      <div className="mt-10" style={{height: '120vh', overflowY: 'scroll'}}>
      <ProductsGridBlock
          sectionHeading=""
          sectionSubHeading=""
          className={''}
          uniqueKey="best-sellers"
          menuItems={products}
        />
      </div>
      {!isAllDataLoaded && !isFetching && (
        <div ref={ref}>
          <h2 className="text-center my-3">Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default ProductListByCategory;
