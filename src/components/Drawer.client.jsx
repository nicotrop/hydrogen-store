import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Drawer = ({ open, onClose, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveTo="opacity-0"
        >
          <div className="fixed bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="md:w-[15rem] w-[10rem] transform text-left align-middle shadow-xl transition-all antialiased bg-neutral-50">
                  <header className="sticky top-0 flex items-center justify-between px-4 h-24 sm:px-8 md:px-12">
                    <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lg">
                      Cart
                    </h3>
                    <button
                      type="button"
                      className="p-4 -m-4 transition text-primary hover:text-primary/50"
                      onClick={onClose}
                    >
                      X
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Drawer.Title = Dialog.Title;

export default Drawer;
