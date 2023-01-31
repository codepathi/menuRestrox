import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useLocalStorage } from '@utils/use-local-storage';
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});
const AuthMenu = dynamic(() => import('@components/layout/header/auth-menu'), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import('@components/layout/header/mobile-menu')
);

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    toggleMobileSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  const router = useRouter();
  function handleLogin() {
    // openModal('LOGIN_VIEW');
    router.push('/profile');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  const [restaurant, setRestaurant] = useLocalStorage('restaurant');
  const [table, setTable] = useLocalStorage('table');

  const link = restaurant && table ? `/r/${restaurant}/${table}` : '/';

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-skin-fill w-full h-14 px-4 md:px-6 lg:px-8 text-skin-muted pb-0.5 dark:bg-darkBg border-t-[0.5px] border-borderSeperator">
        <Link href={link} className="flex-shrink-0">
          <span className="sr-only">{t('breadcrumb-home')}</span>
          <HomeIcon className="h-6 text-white dark:text-darkText" />
        </Link>

        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          // onClick={toggleMobileSearch}
          aria-label="Search Button"
        >
          {/* <SearchIcon className="dark:text-darkText" /> */}
          <Link href={link} className="flex-shrink-0">
            <span className="sr-only">{t('breadcrumb-home')}</span>
            <HomeIcon className="h-6 dark:text-darkText" />
          </Link>
        </button>
        <CartButton hideLabel={true} iconClassName="text-opacity-100" />
        <AuthMenu
          isAuthorized={isAuthorized}
          href={ROUTES.ACCOUNT}
          btnProps={{
            className: 'flex-shrink-0 focus:outline-none',
            children: (
              <UserCircleIcon className="h-6 dark:text-darkText text-white" />
            ),
            // onClick: handleLogin,
          }}
        >
          <UserCircleIcon className="h-6 dark:text-darkText text-white" />
        </AuthMenu>
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
