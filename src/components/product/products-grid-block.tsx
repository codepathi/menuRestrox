import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Items, MenuItems } from '@framework/types';
import { useState } from 'react';
import ProductDrawer from './product-drawer';

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  uniqueKey?: string;
  menuItems: MenuItems[] | undefined;
}

const ProductsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  uniqueKey,
  menuItems,
}) => {
  const [openProductDrawer, setOpenProductDrawer] = useState<boolean>(false);
  const [selectedProductData, setSelectedProductData] = useState<Items>();

  const handleProductDrawer = (data: Items) => {
    setSelectedProductData(data);
    setOpenProductDrawer(true);
  };

  return (
    <>
      <div className={`${className}`}>
        {sectionHeading.trim().length ? (
          <SectionHeader
            sectionHeading={sectionHeading}
            sectionSubHeading={sectionSubHeading}
            headingPosition={headingPosition}
          />
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 md:gap-4 2xl:gap-5">
          {menuItems &&
            menuItems?.map((item: any) => {
              return (
                <ProductCard
                  key={`${uniqueKey}-${item._id}`}
                  product={item}
                  openProductDrawer={handleProductDrawer}
                />
              );
            })}
        </div>
      </div>

      <ProductDrawer
        open={openProductDrawer}
        setOpen={setOpenProductDrawer}
        itemData={selectedProductData}
      />
    </>
  );
};

export default ProductsGridBlock;
