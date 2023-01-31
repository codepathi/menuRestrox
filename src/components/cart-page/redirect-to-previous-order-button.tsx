import Link from '@components/ui/link';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useLocalStorage } from 'react-use';

function RedirectToPreviousOrderButton() {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');
  const { data, isLoading, isError } = usePreviousOrderQuery();

  function getPreviousOrderPageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const previousOrderLink = `/restaurant/${activeRestaurant}/table/${activeTable}/previous-order`;
    return previousOrderLink;
  }

  if (isLoading || isError || !data?.orders?.length) return <div />;

  return (
    <div className={`w-full pt-3 pb-7`}>
      <Link
        href={getPreviousOrderPageLink()}
        className="flex px-5 border rounded-md py-3 cursor-pointer"
      >
        <div className="flex-grow">
          <h1 className="text-red-500 text-lg">
            Previous Order ({data?.orders?.length | 0})
          </h1>
        </div>
        <div className="flex-none">
          <AiOutlineArrowRight className="mt-1 text-red-500 text-lg" />
        </div>
      </Link>
    </div>
  );
}

export default RedirectToPreviousOrderButton;
