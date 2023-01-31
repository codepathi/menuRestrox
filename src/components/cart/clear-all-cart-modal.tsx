import 'rc-drawer/assets/index.css';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  handleSuccess: () => void;
};

const ClearAllCartModal = ({
  isOpen,
  setIsOpen,
  handleSuccess,
}: PropsTypes) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto drop-shadow-lg"
          onClose={closeModal}
          style={{ zIndex: 99999 }}
        >
          <div className="min-h-screen px-4 text-right">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Clear All Item
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    If you want to clear all items from the cart, please click
                    the clear button
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-400 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSuccess}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center ml-4 px-4 py-2 text-sm font-medium  text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ClearAllCartModal;
