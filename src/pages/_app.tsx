import 'react-toastify/dist/ReactToastify.css';
import '@styles/scrollbar.css';
import '@styles/swiper-carousel.css';
import '@styles/custom-plugins.css';
import '@styles/tailwind.css';
import '@styles/my-style.css';
import "@styles/previewBillModal.css";
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
import ProgressBar from '@badrap/bar-of-progress';
import { getDirection } from '@utils/get-direction';
import { useLocalStorage, useLocation } from 'react-use';
import { useCart } from '@contexts/cart/cart.context';

// In order to use react query client, This ComponentWrapper component has been used.

const ComponentWrapper: React.FC = ({ children }) => {
  const router = useRouter();
  const { query } = router;
  const location = useLocation();

  // console.log(location, 'This is location');

  const { resetCart } = useCart();

  const [activeRestaurant, setActiveRestaurant] =
    useLocalStorage('active_restaurant');
  const [activeTable, setActiveTable] = useLocalStorage('active_table');
  const [, setActiveCategory] = useLocalStorage('active_category');
  const [isDisplayComp, setIsDisplayComp] = useState<boolean>(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    if (!query.restaurantId || !query.tableId) return;
    if (
      activeRestaurant === query.restaurantId &&
      activeTable === query.tableId
    ) {
      setIsDisplayComp(true);
      return;
    }
    setActiveRestaurant(query.restaurantId);
    setActiveTable(query.tableId);
    setActiveCategory('all');
  }, [query]);

  useEffect(
    () => () => {
      queryClient.invalidateQueries([]);
      resetCart();
      setIsDisplayComp(true);
    },
    [activeRestaurant, activeTable]
  );

  if (!isDisplayComp) {
    return <div style={{ textAlign: 'center' }}>Loading....</div>;
  }

  return <>{children}</>;
};

const Noop: React.FC = ({ children }) => <>{children}</>;

const progress = new ProgressBar({
  size: 4,
  color: 'red',
  className: 'zIndex-50',
  delay: 100,
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const router = useRouter();
  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const Layout = (Component as any).Layout || Noop;

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);
  Router.events.on('routeChangeError', progress.finish);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ManagedUIContext>
          <>
            <DefaultSeo />
            <ComponentWrapper>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} key={router.route} />
              </Layout>
            </ComponentWrapper>

            <ToastContainer />
            <ManagedModal />
            <ManagedDrawer />
          </>
        </ManagedUIContext>
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
