import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import HeroBannerCard from '@components/hero/hero-banner-card';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useState } from 'react';
import { useLocalStorage } from '@utils/use-local-storage';

export default function Home() {
  // const categories = useState([
  //   { name: 'All' },
  //   { name: 'Breakfast' },
  //   { name: 'Lunch' },
  //   { name: 'Fastfood' },
  //   { name: 'Drinks' },
  // ]);
  const restaurant = useLocalStorage('restaurant');
  const table = useLocalStorage('table');
  const link = restaurant && table ? `/r/${restaurant}/${table}` : '/';

  return (
    <>
      <Seo title=" " description="FoodHunter" path={link} />
      <HeroBannerCard
        banner={heroBanner}
        className="hero-banner-six max-h-[100px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] py-20 py:pt-24 mb-5 2xl:bg-center"
      />
      <Container>
        <div className="flex space-x-7 overflow-y-scroll sticky top-16 z-[20]  bg-white  pb-1 w-full md:hidden dark:bg-darkBg scrollbar-hide">
          {/* {categories.map((cat: any) => (
            <p className="dark:text-darkText">Scan QR Code</p>
          ))} */}
          <p className="dark:text-darkText">Scan QR Codes</p>
        </div>
      </Container>

      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
