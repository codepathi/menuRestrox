// This page has not been used.

import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { CgCoffee } from 'react-icons/cg';
import { MdOutlineCategory, MdOutlineHome } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import { useLocalStorage } from 'react-use';
import { useUI } from '@contexts/ui.context';
import Link from '@components/ui/link';

const FloatingFooterMenu = () => {
  const { openDrawer, setDrawerView } = useUI();
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');

  function getHomeLink(): string {
    return `/restaurant/${activeRestaurant}/table/${activeTable}`;
  }

  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    return openDrawer();
  }

  return (
    <Menu>
      <Menu.Button className="flex items-center justify-center rounded-sm drop-shadow-lg z-50 bg-white w-[40px] h-[40px] select-none">
        <Image
          src="/assets/images/app-icon.png"
          height={33}
          width={35}
          quality={100}
          className=""
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-40 right-0 bottom-0 px-5 py-5 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none select-none"
          style={{ width: 'calc(100vw - 35px)', maxWidth: '400px' }}
        >
          <div className="grid grid-cols-3 gap-2">
            <Menu.Item>
              <Link href={`${getHomeLink()}/category`}>
                <div className="cursor-pointer hover:text-red-700">
                  <div className="flex justify-center">
                    <MdOutlineCategory className="text-[25px]" />
                  </div>
                  <p className="text-center text-[12px] mt-1">Category</p>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href={getHomeLink()}>
                <div className="cursor-pointer hover:text-red-700">
                  <div className="flex justify-center">
                    <MdOutlineHome className="text-[25px]" />
                  </div>
                  <p className="text-center text-[12px] mt-1">Home</p>
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item onClick={handleCartOpen}>
              <div className="cursor-pointer hover:text-red-700">
                <div className="flex justify-center">
                  <FiShoppingCart className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">Cart</p>
              </div>
            </Menu.Item>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5 rounded-md">
            <Menu.Item>
              <div className="bg-gray-100 py-2 cursor-pointer hover:text-red-700">
                <div className="flex justify-center">
                  <AiOutlineStock className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">View Bill</p>
              </div>
            </Menu.Item>

            <Menu.Item>
              <div className="bg-gray-100 py-2 rounded-md cursor-pointer hover:text-red-700">
                <div className="flex justify-center">
                  <CgCoffee className="text-[25px]" />
                </div>
                <p className="text-center text-[12px] mt-1">Previous Order</p>
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FloatingFooterMenu;
