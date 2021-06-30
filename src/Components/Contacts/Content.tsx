import { useMutation, useQuery } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ADD_CONTACT, DELETE_USER, GET_CONTACTS } from '../../Queries';
import Navigation from '../Navigation';
import ContactForm from './ContactForm';

const Content = (): JSX.Element => {

  const [open, setOpen] = useState(false);
  const [token] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');

  const { data, refetch } = useQuery(GET_CONTACTS, { variables: { token }, fetchPolicy: "network-only" });

  const [addContact] = useMutation(ADD_CONTACT, { onCompleted: (data: any) => checkErrors(data) });
  const [removeContact] = useMutation(DELETE_USER, { onCompleted: (data: any) => checkDeleteErrors(data) });

  const toggleModal = (e: any) => {
    e.preventDefault();
    setOpen(true);
  }

  const handleInputChange = (e: any) => {
    console.log(e);
    setEmail(e.target.value);
  }

  const handleSubmit = (e: any) => {
    addContact({ variables: { email, token } });
  }

  const handleDeleteContactButton = (e: any) => {
    removeContact({ variables: { email: e.target.name, token } });
  }

  const checkDeleteErrors = (data: any) => {
    if (data?.deleteContact?.err || data.deleteContact?.contactHasDeleted === false) {
      toast.error(`${data?.deleteContact?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.deleteContact?.contactHasDeleted === true) {
      toast.success('Contact Deleted');
      refetch();
    }
  }

  const checkErrors = (data: any) => {
    if (data?.createContact?.err || data.createContact?.contactHasCreated === false) {
      toast.error(`${data?.createContact?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.createContact?.contactHasCreated === true) {
      toast.success('Contact Added');
      setOpen(false);
      refetch();
    }
  }

  return (
    <>
      <Navigation />
      <section className="mt-16 text-blueGray-700">
        <div className="container items-center px-5 py-8 mx-auto lg:px-24">
          <div className="flex flex-wrap mb-12 text-left">
            {data?.getContacts?.contacts.map((contact: any) => (
              <div className="flex items-center justify-center w-full p-4 mx-auto lg:w-1/3" key={contact?._id}>
                <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                  <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> {contact?.userName} </h1>
                  <img className="border-2 border-black w-96 h-96 rounded-xl border-opacity-85" src={contact?.avatar} alt="profileAvatar" />
                  <p className="mt-4 text-xl transition duration-300 ease-in-out transform hover:text-indigo-500">{contact?.email}</p>
                  <button name={contact?.email} onClick={handleDeleteContactButton} className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-red-500 border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Delete Contact </button>
                </div>
              </div>
            ))}
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
      <ContactForm open={open} setOpen={setOpen} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </>
  );
}

export default Content;
