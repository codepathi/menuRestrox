import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  item: any;
  setActiveCategory: Function;
  className?: string;
}

const CategoryCard: React.FC<Props> = ({
  item,
  setActiveCategory,
  className,
}) => {
  const { t } = useTranslation('common');
  const { categoryName, coverImage } = item ?? {};
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <div
      className={cn('group block w-full text-center cursor-pointer', className)}
      onClick={() => setActiveCategory(item._id)}
    >
      <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-2xl overflow-hidden bg-skin-thumbnail">
        <div className={'flex flex-shrink-0  w-full h-full'}>
          <Image
            src={coverImage ?? categoryPlaceholder}
            alt={categoryName || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      <h3 className="capitalize text-skin-base text-sm sm:text-15px lg:text-base truncate dark:text-darkText">
        {categoryName}
      </h3>
    </div>
  );
};

export default CategoryCard;
