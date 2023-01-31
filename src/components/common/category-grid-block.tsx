import dynamic from 'next/dynamic';
import CategoryCard from '@components/cards/category-card';
import SectionHeader from '@components/common/section-header';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import { useFullLogo } from '@contexts/logo/logo.context';
import { useEffect, useRef } from 'react';

const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface CategoriesProps {
  setActiveCategory: Function;
  restaurantId: string | number;
  className?: string;
}
const breakpoints = {
  '1640': {
    slidesPerView: 9,
    spaceBetween: 24,
  },
  '1280': {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  '530': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
  className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
  setActiveCategory,
  restaurantId,
}) => {
  const { data, isLoading, isError, error } = useCategoriesQuery(restaurantId);
  const categoryRef = useRef<any>(null);
  const { setFullLogoInView, removeFullLogoFromView } = useFullLogo();

  useEffect(() => {
    if (!categoryRef || !document) return;
    const documentScroll = document.addEventListener('scroll', () => {
      const categoryScrollY =
        categoryRef?.current?.getBoundingClientRect()?.y || 0;

      if (categoryScrollY < 75) setFullLogoInView();
      else removeFullLogoFromView();
    });

    return () => documentScroll;
  }, [categoryRef]);

  return (
    <div className={className}>
      <br />
      {/* <SectionHeader
        sectionHeading="What food you love to order"
        sectionSubHeading="Order your favroite foods from different categories here"
        headingPosition="center"
      /> */}
      <div ref={categoryRef}>
        {isError ? (
          <Alert
            message={error?.response?.data?.message || 'Something went wrong'}
            className="mb-14 3xl:mx-3.5"
          />
        ) : (
          <Carousel
            autoplay={false}
            breakpoints={breakpoints}
            // buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
          >
            {isLoading && !data
              ? Array.from({ length: 16 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`category--key-${idx}`}>
                      <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
                    </SwiperSlide>
                  );
                })
              : data?.map((category) => (
                  <SwiperSlide key={`category--key-${category._id}`}>
                    <CategoryCard
                      item={category}
                      setActiveCategory={setActiveCategory}
                    />
                  </SwiperSlide>
                ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CategoryGridBlock;
