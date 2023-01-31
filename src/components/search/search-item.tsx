import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { useLocalStorage } from 'react-use';
import Link from '@components/ui/link';
import { useSearch } from '@contexts/search/search.context';

interface IProps {
  className?: string;
}

const SearchItem: React.FC<IProps> = ({ className = '' }) => {
  const [activeRestaurant] = useLocalStorage<string>('active_restaurant');
  const [activeTable] = useLocalStorage<string>('active_table');
  const searchComRef = useRef<any>(null);
  const { setSearchCompInView, removeSearchCompFromView } = useSearch();

  useEffect(() => {
    if (!searchComRef || !document) return;

    const documentScrollEvent = document.addEventListener('scroll', () => {
      const searchComScrollY =
        searchComRef?.current?.getBoundingClientRect()?.y || 0;

      if (searchComScrollY <= 20) setSearchCompInView();
      else removeSearchCompFromView();
    });

    return () => documentScrollEvent;
  }, [searchComRef]);

  useEffect(() => {
    removeSearchCompFromView();
  }, []);

  function getSearchPageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}/search`;
    return homePageLink;
  }

  return (
    <div className={cn(className, 'mt-7 select-none')}>
      <Link href={getSearchPageLink()}>
        <div
          ref={searchComRef}
          className="w-full flex items-center px-4 py-3 rounded-md bg-[#f2f2f2]"
        >
          <FiSearch className="" size={20} color="#999999" />
          <span className="ms-5 text-sm text-[#999999]">Find your food</span>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
