import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Profile from '../Profile';
import { UPDATE_USER } from '../../Queries';
import { useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Navigation = (): JSX.Element => {

  const { pathname } = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'Tasks', href: '/tasks', current: false },
    { name: 'Contacts', href: '/contacts', current: false },
  ];

  navigation.map((item): any => {
    if (pathname === item?.href) {
      item.current = true
    }
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [session] = useState(localStorage.getItem('token'));
  let [userName, setUserName] = useState<string | any>(localStorage.getItem('userName'));
  let [avatar, setAvatar] = useState<string | any>(localStorage.getItem('avatar'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);


  const toggleSignOut = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('avatar');
    localStorage.removeItem('userName');
    setIsLoggedIn(true);
  }

  const toggleModal = (e: any) => {
    e.preventDefault();
    setOpen(true);
  }

  const [editUser] = useMutation(UPDATE_USER, { onCompleted: (data) => checkErrors(data) });

  const handleSubmit = (e: any) => {
    editUser({ variables: { token: session, userName, avatar } });
    toggleSignOut(e);
  }

  const handleInputChange = (e: any) => {
    const { target } = e;
    if (target.name === 'userName') {
      setUserName(target?.value);
    }
    if (target.name === 'avatar') {
      setAvatar(target?.value);
    }
  }

  const checkErrors = (data: any) => {
    if (data?.editUser?.err || data.ceditUser?.userHasUpdated === false) {
      toast.error(`${data?.editUser?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.editUser?.contactHasCreated === true) {
      toast.success('Contact Added');
      setOpen(false);
    }
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-screen sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <img
                      className="block w-auto h-8 lg:hidden"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-8 h-8 rounded-full"
                              src={avatar}
                              alt="profile_avatar"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  onClick={toggleModal}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  onClick={toggleSignOut}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Profile open={open} setOpen={setOpen} userName={userName} avatar={avatar} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      {isLoggedIn && <Redirect to="/signin" />}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}


export default Navigation;
