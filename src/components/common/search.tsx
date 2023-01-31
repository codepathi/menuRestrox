import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { useSearchProductsQuery } from '@framework/search-products/search-produts';
import { Items } from '@framework/types';
import ProductDrawer from '@components/product/product-drawer';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
    },
    ref
  ) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const router = useRouter();
    const [activeRestaurant] = useLocalStorage('active_restaurant');
    const [activeTable] = useLocalStorage('active_table');

    const [searchText, setSearchText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const { data, refetch, isLoading } = useSearchProductsQuery(searchText);

    const [isProductDrawerOpen, setIsProductDrawerOpen] =
      useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Items>();

    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );

    const inputEl = useRef<any>(null);

    useEffect(() => {
      if (searchText.length >= 2) {
        refetch();
      }
    }, [searchText]);

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value.trim());
    }
    function clear() {
      setSearchText('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    // Function to open item page

    const handleOpenPrdouctDrawer = (item: Items) => {
      setSelectedItem(item);
      setTimeout(() => setIsProductDrawerOpen(true), 500);
    };

    const handlesubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      clear();
      const searchPageLink = `/restaurant/${activeRestaurant}/table/${activeTable}/search-item?q=${searchText}`;
      router.push(searchPageLink);
    };

    const viewFullDetails = () => {
      clear();
      const searchPageLink = `/restaurant/${activeRestaurant}/table/${activeTable}/search-item?q=${searchText}`;

      router.push(searchPageLink);
    };

    useEffect(() => {
      if (displayMobileSearch) {
        inputEl?.current?.focus();
      }
    }, [displayMobileSearch]);
    return (
      <>
        <div
          ref={ref}
          className={cn(
            'w-full transition-all duration-200 ease-in-out',
            className
          )}
        >
          <div
            className={cn('overlay cursor-pointer min-h-full', {
              open: displayMobileSearch,
              'input-focus-overlay-open': inputFocus === true,
              'open-search-overlay': displaySearch,
            })}
            onClick={() => clear()}
          />
          {/* End of overlay */}

          <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
            <div className="flex flex-col mx-auto w-full">
              <SearchBox
                searchId={searchId}
                name="search"
                value={searchText}
                onSubmit={handlesubmit}
                onChange={handleAutoSearch}
                onClear={clear}
                onFocus={() => enableInputFocus()}
                variant={variant}
                ref={inputEl}
              />
            </div>

            {/* End of searchbox */}

            {searchText && (
              <div className="w-full absolute top-[56px] start-0 py-2.5 bg-skin-fill rounded-md flex flex-col overflow-hidden shadow-dropDown z-3">
                <Scrollbar className="os-host-flexbox">
                  <div className="w-full h-[315px]">
                    {isLoading ? (
                      Array.from({ length: 15 }).map((_, idx) => (
                        <div
                          key={`search-result-loader-key-${idx}`}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        </div>
                      ))
                    ) : searchText.trim().length === 1 ? (
                      <div className="px-5">
                        <div className="bg-gray-200 rounded-sm p-2">
                          Enter at least two character
                        </div>
                      </div>
                    ) : data?.length ? (
                      data?.map((item, index) => (
                        <div
                          key={`search-result-key-${index}`}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 hover:bg-skin-two"
                          onClick={clear}
                        >
                          <SearchProduct
                            item={item}
                            key={index}
                            handleOpenPrdouctDrawer={handleOpenPrdouctDrawer}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="px-3 pt-2">
                        <p>Item not found</p>
                      </div>
                    )}
                  </div>
                </Scrollbar>
                <div className="flex justify-center pb-2 pt-1">
                  {data?.length ? (
                    <button
                      className="cursor-pointer"
                      onClick={viewFullDetails}
                    >
                      View full details
                    </button>
                  ) : null}
                </div>
              </div>
            )}
            {/* End of search result */}
          </div>
        </div>
        <ProductDrawer
          open={isProductDrawerOpen}
          setOpen={setIsProductDrawerOpen}
          itemData={selectedItem}
        />
      </>
    );
  }
);

export default Search;
