import React, { useEffect, useRef, useState } from 'react';
import Layout from '@components/layout/layout-two';
import { AiOutlineClose } from 'react-icons/ai';
import Container from '@components/ui/container';
import { FiSearch } from 'react-icons/fi';
import cn from 'classnames';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useLocalStorage, useSessionStorage } from 'react-use';
import ProductsGridBlock from '@components/product/products-grid-block';
import { useProductByCategoryQuery } from '@framework/product/get-all-products-by-category';
import { useSearchProductsQuery } from '@framework/search-products/search-produts';
import { MenuItems } from '@framework/types';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import { useSearch } from '@contexts/search/search.context';

interface ICategoryListProps {
  calssName?: string;
}

interface ISearchItemsGridProps {
  data: MenuItems[];
  isLading: boolean;
  hideKeyword: Function;
  searchInputRef: any;
  searchKey: string;
  isInputSearchFocus: boolean;
}

const CategoryList: React.FC<ICategoryListProps> = ({ calssName }) => {
  const router = useRouter();
  const [activeRestaurant] = useLocalStorage<string>('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const [, setActiveCategory] = useSessionStorage<string>('active_category');
  const { data, isLoading } = useCategoriesQuery(activeRestaurant || '');

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function redirectToHomePage(catId: string) {
    setActiveCategory(catId);
    router.push(getHomePageLink());
  }

  if (isLoading) {
    return (
      <div className="mt-7">
        <h1 className="text-xl font-semibold">Category</h1>
        <h1 className="text-center mt-5">Loading...</h1>
      </div>
    );
  }

  return (
    <div className={cn(calssName, 'mt-7')}>
      <h1 className="text-xl font-semibold">Category</h1>
      <div className="bg-red-600 mt-5 w-full">
        {data &&
          data.map((data) => {
            return (
              <span
                key={data._id}
                className="float-left me-2 mt-3 px-5 py-2 text-[0.9rem] text-black rounded-md select-none bg-gray-100"
                onClick={() => redirectToHomePage(data._id)}
              >
                {data.categoryName}
              </span>
            );
          })}
      </div>
    </div>
  );
};

const SearchItetmsGrid: React.FC<ISearchItemsGridProps> = ({
  data,
  isLading,
  hideKeyword,
  searchInputRef,
  searchKey,
  isInputSearchFocus,
}) => {
  const searchedGridRef = useRef<any>(null);
  const [itemGridScrollY, setItemGridScrollY] = useState(0);

  useEffect(() => {
    if (itemGridScrollY < 0 && isInputSearchFocus && document) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      searchInputRef.current.focus = true;
    }
  }, [isInputSearchFocus, itemGridScrollY]);

  useEffect(() => {
    if (!document || !searchedGridRef) return;

    const documentScroller = document.addEventListener('scroll', function () {
      const currentScrollY =
        searchedGridRef?.current?.getBoundingClientRect()?.y || 0;
      setItemGridScrollY(currentScrollY);

      if (isInputSearchFocus && currentScrollY < 0) {
        hideKeyword();
      }
    });

    return () => documentScroller;
  }, [searchedGridRef]);

  if (searchKey.length < 2) {
    return (
      <div ref={searchedGridRef}>
        <h1 className="mt-3 text-center">Please enter at least 2 character</h1>
      </div>
    );
  }

  if (isLading) {
    return (
      <div ref={searchedGridRef}>
        <h1 className="mt-3 text-center">Loading</h1>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div ref={searchedGridRef}>
        <h1 className="mt-3 text-center">Item not found</h1>
      </div>
    );
  }

  return (
    <div ref={searchedGridRef}>
      <ProductsGridBlock
        sectionHeading=""
        menuItems={data || []}
        className="clear-both pt-10"
      />
    </div>
  );
};

const Search: React.FC = () => {
  const [activeRestaurant] = useLocalStorage<string>('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const [searchKey, setSearchKey] = useState('');
  const searchRef = useRef<any>(null);
  const [isInputSearchFocus, setIsInputSearchFocus] = useState(false);

  // const { isSearchCompInView, setSearchCompInView } = useSearch();

  const { data: productData } = useProductByCategoryQuery({
    restaurantId: activeRestaurant || null,
    categoryId: 'all',
    isEnabledQuery: true,
    lastItemDate: null,
  });

  const {
    refetch,
    data: searchItems,
    isLoading: isSearchLoading,
  } = useSearchProductsQuery(searchKey);

  useEffect(() => {
    if (searchKey.trim().length < 2) return;
    refetch();
  }, [searchKey]);

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function hideSearchKeyword() {
    searchRef?.current?.blur();
  }

  function searchInputOnFocusHandler() {
    setIsInputSearchFocus(true);
  }

  function searchInputOnBlurHandler() {
    setIsInputSearchFocus(false);
  }

  return (
    <Layout displayLayout={false}>
      <Container className="mb-[150px]">
        <div className="flex pt-9 items-center">
          <Link href={getHomePageLink()}>
            <AiOutlineClose size={25} className="" />
          </Link>
          <span className="ms-4 text-[1.5rem]">Search</span>
        </div>

        <form className="mt-8 sticky top-0 z-40 bg-white pt-3 pb-2">
          <div className="flex items-center border rounded-md py-1 px-1 bg-[#f2f2f2]">
            <FiSearch className="mx-2" size={21} color="#999999" />
            <input
              type="text"
              placeholder="Search items"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full px-2 py-1 bg-transparent outline-none"
              ref={searchRef}
              onFocus={searchInputOnFocusHandler}
              onBlur={searchInputOnBlurHandler}
            />
          </div>
        </form>

        {isInputSearchFocus || searchKey.trim().length >= 2 ? (
          <SearchItetmsGrid
            data={searchItems || []}
            isLading={isSearchLoading}
            hideKeyword={hideSearchKeyword}
            searchInputRef={searchRef}
            isInputSearchFocus={isInputSearchFocus}
            searchKey={searchKey}
          />
        ) : (
          <>
            <CategoryList />
            <ProductsGridBlock
              sectionHeading="Popular in this restaurant"
              headingPosition="left"
              menuItems={productData?.menuItemList || []}
              className="clear-both pt-10"
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Search;
