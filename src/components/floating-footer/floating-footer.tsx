import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import FloatingMakeOrder from './floating-make-order';
import { useLocalStorage } from 'react-use';
import FloatingFooterMenuModal from './floating-footer-menu-modal';
import { useState } from 'react';
import Image from 'next/image';
import Link from '@components/ui/link';

type FloatingFooterType = {
  displayOrderButton?: boolean;
  displayGridButton: boolean;
};

const FloatingFooter = ({
  displayOrderButton,
  displayGridButton,
}: FloatingFooterType) => {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState<boolean>(false);

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function getListViewPageLink() {
    const link = getHomePageLink();
    return `${link}/item-list-view`;
  }

  return (
    <div className="fixed bottom-8 right-4 z-20">
      <div>
        {displayGridButton ? (
          <Link
            href={getHomePageLink()}
            className="flex items-center justify-center rounded-sm drop-shadow-lg z-50 bg-white w-[40px] h-[40px]"
          >
            <BsGrid className="text-[20px]" />
          </Link>
        ) : (
          <Link
            className="flex items-center justify-center rounded-sm drop-shadow-lg z-50 bg-white w-[40px] h-[40px]"
            href={getListViewPageLink()}
          >
            <AiOutlineUnorderedList className="text-[20px]" />
          </Link>
        )}
      </div>
      <div className="mt-2">
        <button
          className="flex items-center justify-center rounded-sm drop-shadow-lg z-50 bg-white w-[40px] h-[40px] select-none"
          onClick={() => setIsFooterMenuOpen(true)}
        >
          <Image
            src="/assets/images/app-icon.png"
            height={33}
            width={35}
            quality={100}
            className=""
          />
        </button>
        <FloatingFooterMenuModal
          isOpen={isFooterMenuOpen}
          setIsOpen={setIsFooterMenuOpen}
        />
      </div>
      {displayOrderButton ? <FloatingMakeOrder /> : null}
    </div>
  );
};

export default FloatingFooter;
