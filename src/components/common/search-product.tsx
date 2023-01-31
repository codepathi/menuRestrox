import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { productPlaceholder } from '@assets/placeholders';
import { Item } from '@contexts/cart/cart.utils';

type SearchProductProps = {
  item: any;
  handleOpenPrdouctDrawer: Function;
};

const SearchProduct: React.FC<SearchProductProps> = ({
  item,
  handleOpenPrdouctDrawer,
}) => {
  return (
    <div onClick={() => handleOpenPrdouctDrawer(item)}>
      <div className="group w-full h-auto flex justify-start items-center">
        <div className="relative flex w-12 h-12 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
          <Image
            src={item?.images[0] ? item?.images[0] : productPlaceholder}
            width={48}
            height={48}
            loading="eager"
            alt={item.itemName || 'Product Image'}
            className="bg-skin-thumbnail object-cover"
          />
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <h3 className="truncate text-skin-base text-15px">{item.itemName}</h3>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
