import Drawer from 'rc-drawer';
import { MdOutlineCategory, MdOutlineHome } from 'react-icons/md';
import { useLocalStorage } from 'react-use';
import Link from '@components/ui/link';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineStock } from 'react-icons/ai';
import { CgCoffee } from 'react-icons/cg';

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function FloatingFooterMenuModal({ isOpen, setIsOpen }: IProps) {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');

  function handleClose() {
    setIsOpen(!isOpen);
  }

  function getHomeLink(): string {
    return `/restaurant/${activeRestaurant}/table/${activeTable}`;
  }

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      placement="bottom"
      width="100vw"
      level={null}
      handler={false}
      contentWrapperStyle={{
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <div className="flex justify-end">
        <div
          className="bg-white my-5 mr-4 px-5 py-5 rounded-md shadow-card"
          style={{ width: 'calc(100vw - 35px)', maxWidth: '450px' }}
        >
          <div className="grid grid-cols-3 gap-2">
            <Link href={`${getHomeLink()}/category`}>
              <div
                className="cursor-pointer hover:text-red-700"
                onClick={handleClose}
              >
                <div className="flex justify-center">
                  <MdOutlineCategory className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">Category</p>
              </div>
            </Link>

            <Link href={getHomeLink()}>
              <div
                className="cursor-pointer hover:text-red-700"
                onClick={handleClose}
              >
                <div className="flex justify-center">
                  <MdOutlineHome className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">Home</p>
              </div>
            </Link>

            <Link
              className="cursor-pointer hover:text-red-700"
              href={`${getHomeLink()}/cart`}
            >
              <div className="flex justify-center">
                <FiShoppingCart className="text-[25px]" />
              </div>
              <p className="text-center text-[12px] mt-1">Cart</p>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5 rounded-md">
            <Link href={`${getHomeLink()}/view-bill`}>
              <div
                className="bg-gray-100 py-2 cursor-pointer hover:text-red-700"
                onClick={handleClose}
              >
                <div className="flex justify-center">
                  <AiOutlineStock className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">View Bill</p>
              </div>
            </Link>

            <Link
              href={`${getHomeLink()}/previous-order`}
              className="bg-gray-100 py-2 rounded-md cursor-pointer hover:text-red-700"
            >
              <div className="flex justify-center">
                <CgCoffee className="text-[25px]" />
              </div>
              <p className="text-center text-[12px] mt-1">Previous Order</p>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default FloatingFooterMenuModal;
