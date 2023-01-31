import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { productPlaceholder } from '@assets/placeholders';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';
import SectionHeader from '@components/common/section-header';

function Category() {
  const router = useRouter();
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const [, setActiveCategory] = useLocalStorage('active_category');

  const { data, isLoading, isError } = useCategoriesQuery(
    activeRestaurant as string
  );

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return null;
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  function categoryClickHandler(catId: string) {
    setActiveCategory(catId);
    const homePageLink = getHomePageLink();
    if (homePageLink) router.push(homePageLink);
  }

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p>Something went wrong. Please try again later.</p>
      </Container>
    );
  }

  return (
    <Layout displaySearchIcon={true}>
      <Container className="mb-[150px]">
        <SectionHeader
          headingPosition="left"
          sectionHeading="Category List"
          className="pt-5"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-3 md:gap-4 2xl:gap-5 mt-3">
          {data &&
            data.map((category) => {
              return (
                <div
                  className="flex mt-2 w-full select-none cursor-pointer"
                  key={category._id}
                  onClick={() => categoryClickHandler(category._id)}
                >
                  <div className="flex-none w-[50px] h-[50px]">
                    <Image
                      src={category.coverImage || productPlaceholder}
                      alt={'Product Image'}
                      width={50}
                      height={50}
                      quality={100}
                      className="object-cover bg-skin-thumbnail"
                    />
                  </div>
                  <div className="flex-grow flex items-center pl-3">
                    <p>{category.categoryName}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </Layout>
  );
}

export default Category;
