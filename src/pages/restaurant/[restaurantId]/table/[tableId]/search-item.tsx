import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductsGridBlock from '@components/product/products-grid-block';
import { useRouter } from 'next/router';
import { useSearchProductsQuery } from '@framework/search-products/search-produts';
import { useEffect } from 'react';
import SectionHeader from '@components/common/section-header';

const Search = () => {
  const { query } = useRouter();
  const { q = null } = query;
  const { data, refetch, isLoading, isIdle } = useSearchProductsQuery(
    q as string
  );

  useEffect(() => {
    if (q) refetch();
  }, [q]);

  if (isLoading || isIdle) {
    return <div className="text-center mt-2">Loading...</div>;
  } else if (!data?.length) {
    return <div className="text-center mt-2">No item found</div>;
  }

  return (
    <Container className="pt-5 mb-[150px]">
      <SectionHeader
        sectionHeading="Searched Items list"
        sectionSubHeading=""
        headingPosition="center"
      />
      <ProductsGridBlock
        sectionHeading=""
        sectionSubHeading=""
        className={''}
        uniqueKey="best-sellers"
        menuItems={data}
      />
    </Container>
  );
};

Search.Layout = Layout;

export default Search;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'faq',
        'footer',
      ])),
    },
  };
};
