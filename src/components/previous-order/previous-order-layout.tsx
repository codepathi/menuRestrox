import Link from '@components/ui/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocalStorage } from 'react-use';

const PreviousOrderLayout: React.FC = ({ children }) => {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');

  function getHomePageLink() {
    if (!activeRestaurant || !activeTable) return '/';
    const homePageLink = `/restaurant/${activeRestaurant}/table/${activeTable}`;
    return homePageLink;
  }

  return (
    <div className="w-full bg-[white]">
      <div className="sticky top-0 w-full pt-5 pb-3 px-5 md:px-7 bg-white z-10">
        <div className="flex justify-between">
          <div>
            <Link href={getHomePageLink()}>
              <AiOutlineArrowLeft className="mt-3 font-black text-gray-700 text-xl cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
      <div className=" pb-3 px-5 md:px-7">{children}</div>
    </div>
  );
};

export default PreviousOrderLayout;
