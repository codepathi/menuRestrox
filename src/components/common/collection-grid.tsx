import CollectionCard from '@components/cards/collection-card';
import SectionHeader from '@components/common/section-header';
import Container from '@components/ui/container';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';

const data = [
  {
    id: 1,
    slug: 'feel-the-thirsty-in-summer-anytime',
    image: '/assets/images/collection/1.png',
    title: 'Feel the thirsty in summer anytime',
    description: 'Your body needs drinks',
  },
  {
    id: 2,
    slug: 'most-popular-item-for-Fast-food',
    image: '/assets/images/collection/2.png',
    title: 'Most popular item for Fast food',
    description: 'Tasty and spicy fast food with different flavors.',
  },
  {
    id: 3,
    slug: 'authentic-japanese-food-in-real-taste',
    image: '/assets/images/collection/3.png',
    title: 'Authentic japanese food in real taste',
    description: 'Japanese foods',
  },
  {
    id: 4,
    slug: 'explore-our-family-of-freshest®-foods',
    image: '/assets/images/collection/4.png',
    title: 'Explore our family of freshest® Foods',
    description: `Your pet’s way of telling you that it's make taste`,
  },
];

interface Props {
  className?: string;
  headingPosition?: 'left' | 'center';
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
  },
  '768': {
    slidesPerView: 3,
  },
  '540': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const CollectionGrid: React.FC<Props> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
  headingPosition = 'left',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <Container>
        <SectionHeader
          sectionHeading="Curated Collections"
          sectionSubHeading="We have categories the best quality food items"
          headingPosition={headingPosition}
        />
        {width! < 1536 ? (
          <Carousel
            breakpoints={breakpoints}
            autoplay={{ delay: 4000 }}
            prevButtonClassName="-start-2.5 -top-14"
            nextButtonClassName="-end-2.5 -top-14"
            className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4"
            prevActivateId="collection-carousel-button-prev"
            nextActivateId="collection-carousel-button-next"
          >
            {data?.map((item) => (
              <SwiperSlide
                key={`collection-key-${item.id}`}
                className="px-1.5 md:px-2 xl:px-2.5 py-4"
              >
                <CollectionCard
                  key={item.id}
                  collection={item}
                  href={`${ROUTES.BUNDLE}/${item.slug}`}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="2xl:grid 2xl:grid-cols-4 gap-5 3xl:gap-7">
            {data?.map((item) => (
              <CollectionCard
                key={item.id}
                collection={item}
                href={`${ROUTES.BUNDLE}/${item.slug}`}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CollectionGrid;