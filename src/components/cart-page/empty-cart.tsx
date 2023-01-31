import Image from '@components/ui/image';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

interface Props {
  tittle?: string;
  subTittle?: string;
  classname?: string;
}

const EmptyCart: React.FC<Props> = ({ tittle, subTittle, classname }) => {
  return (
    <div
      className={
        classname ||
        'h-[90vh] px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center'
      }
    >
      <div>
        <div className="mx-auto w-[220px] md:w-auto dark:bg-darkBg">
          <Image
            src="/assets/images/empty-cart.png"
            alt="empty cart"
            width={270}
            height={240}
          />
        </div>
        <Heading
          variant="titleMedium"
          className="mb-1.5 pt-8 dark:text-darkText text-center"
        >
          {tittle || 'Your cart is empty'}
        </Heading>
        <Text className="dark:text-darkText text-center">
          {subTittle || 'Please add item to your cart list'}
        </Text>
      </div>
    </div>
  );
};

export default EmptyCart;
