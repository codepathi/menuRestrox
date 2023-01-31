import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
import SearchIcon from '@components/icons/search-icon';
import { useLocalStorage } from 'react-use';
import Link from '@components/ui/link';
import { useSearch } from '@contexts/search/search.context';
import { useRestaurantQuery } from '@framework/restaurant/restaurant-details';

const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

type IHeaderProps = {
  displaySearchIcon?: boolean;
  displayFullLogo?: boolean;
};

const { site_header } = siteSettings;

const Header: React.FC<IHeaderProps> = ({
  displaySearchIcon = false,
  displayFullLogo = true,
}) => {
  const { data: restaurantData } = useRestaurantQuery();
  const { openSidebar, displayMobileSearch } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const { isSearchCompInView } = useSearch();

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-one w-full h-16 lg:h-20 z-30 sticky top-0',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky body-font bg-skin-fill w-full h-16 lg:h-20 z-20 transition duration-200 ease-in-out dark:bg-darkBg">
        {/* <Search className="top-bar-search absolute z-30 px-4 md:px-6 top-1" /> */}
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between lg:justify-center h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn me-5 hidden lg:flex xl:hidden flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            {/* <MenuIcon /> */}
          </button>

          <Logo
            className="-mt-1"
            href={getHomePageLink()}
            displayFullLogo={displayFullLogo}
          />

          <HeaderMenu
            data={site_header.menu}
            className="hidden xl:flex md:ps-6 xl:ps-10"
          />

          <div className="flex flex-shrink-0 space-s-5 xl:space-s-7 ms-auto">
            {/* <LanguageSwitcher /> */}

            {isSearchCompInView || displaySearchIcon ? (
              <Link href={`${getHomePageLink()}/search`}>
                <div
                  className="flex items-center justify-center flex-shrink-0 h-auto relative"
                >
                  <b> {restaurantData?.name} </b>
                </div>
              </Link>
            ) : null}
            
            {/* <CartButton className="flex" hideLabel={true} /> */}
            <div className="hidden lg:flex items-center flex-shrink-0 ">
              {/* <UserIcon className="text-skin-base text-opacity-40" /> */}
              {/* <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu> */}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
