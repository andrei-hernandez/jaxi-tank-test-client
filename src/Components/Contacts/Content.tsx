import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import ContactForm from './ContactForm';

const Content = () => {

  const [open, setOpen] = useState(false);

  const toggleModal = (e: any) => {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <section className="mt-16 text-blueGray-700">
        <div className="container items-center px-5 py-8 mx-auto lg:px-24">
          <div className="flex flex-wrap mb-12 text-left">
            <div className="flex items-center justify-center w-full p-4 mx-auto lg:w-1/3">
              <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> AndiUchiha </h1>
                <img className="border-2 border-black rounded-xl border-opacity-85" src="https://avatars.githubusercontent.com/u/71860990?s=400&u=7b78f2b552b8298ee527162f3f7924fa7d7f0628&v=4" alt="profileAvatar" />
                <p className="mt-4 text-xl transition duration-300 ease-in-out transform hover:text-indigo-500">andiuchihahaha@gmail.com</p>
                <button className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-red-500 border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Delete Contact </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full p-4 mx-auto lg:w-1/3">
              <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> AndiUchiha </h1>
                <img className="border-2 border-black rounded-xl border-opacity-85" src="https://avatars.githubusercontent.com/u/71860990?s=400&u=7b78f2b552b8298ee527162f3f7924fa7d7f0628&v=4" alt="profileAvatar" />
                <p className="mt-4 text-xl transition duration-300 ease-in-out transform hover:text-indigo-500">andiuchihahaha@gmail.com</p>
                <button className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-red-500 border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Delete Contact </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full p-4 mx-auto lg:w-1/3">
              <div className="items-center justify-center">
                <button
                  onClick={toggleModal}
                  className="transition duration-300 ease-in-out transform rounded-full focus:ring-2 ring-gray-400 ring-offset-gray-400 ring-offset-2 focus:outline-none focus:shadow-outline">
                  <PlusCircleIcon className="p-0 m-0 text-gray-300 transition duration-200 ease-in-out hover:text-gray-400 w-44 h-44" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm open={open} setOpen={setOpen} />
    </>
  );
}

export default Content;
