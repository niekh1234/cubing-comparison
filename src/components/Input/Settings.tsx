import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { CogIcon, TrashIcon } from '@heroicons/react/outline';
import useStore from '../../store';

const Settings = () => {
  const { reset } = useStore();

  return (
    <div className="flex flex-col ml-auto md:ml-0">
      <div className="opacity-0">Settings</div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full h-10 py-2 pl-3 pr-4 text-sm font-medium text-white bg-gray-600 rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-gray-100">
            <CogIcon className="w-6 h-6"></CogIcon>
            <ChevronDownIcon className="w-5 h-5 -mr-1" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => reset()}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                  >
                    <TrashIcon
                      className={`${active ? 'text-white' : 'text-red-500'} w-5 h-5`}
                    ></TrashIcon>
                    <span>Clear cache</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Settings;
