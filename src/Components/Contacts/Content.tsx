import { useMutation, useQuery } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ADD_CONTACT, DELETE_USER, GET_CONTACTS } from '../../Queries';
import Navigation from '../Navigation';
import ContactForm from './ContactForm';

const Content = (): JSX.Element => {

  const [open, setOpen] = useState(false); //state for the modal form
  const [token] = useState(localStorage.getItem('token')); //state for store the token from the localStorage
  const [email, setEmail] = useState(''); //state used to store the email input from the contactForm

  //apollo hook to realize a query when the component is onMount and extract _data_ when the response and _refetch_ method to re-realize the query.
  const { data, refetch } = useQuery(GET_CONTACTS, { variables: { token }, fetchPolicy: "network-only" });

  // apollo hook to realize a mutation when the user require store a contact in him/her account.
  const [addContact] = useMutation(ADD_CONTACT,
    {
      onCompleted: (data: any) => checkErrors(data) //when the mutation is completed calls the function _checkErrors_ to continue with the process
    });

  // apollo hook to realize a mutation when the user require delete a contact in him/her account.
  const [removeContact] = useMutation(DELETE_USER,
    {
      onCompleted: (data: any) => checkDeleteErrors(data) //when the mutation is completed calls the function _checkDelteErrors_ to continue with the process
    });

  //event handler to open the modal form for store a contact
  const toggleModal = (e: any) => {
    e.preventDefault();
    setOpen(true);
  }

  //event handler form onChange event in the <input> JSX Tag. to store the value in the email State.
  const handleInputChange = (e: any): void => {
    setEmail(e.target.value);
  }

  //event handler to store an calls the destructured function to realize the mutation for store a contact in the user account.
  const handleSubmit = async (e: any): Promise<void> => {
    await addContact({ variables: { email, token } });
  }

  //event handler to remove a contact from the user account calling the destructured function to realize the mutation.
  const handleDeleteContactButton = async (e: any) => {
    await removeContact({ variables: { email: e.target.name, token } });
  }

  //function which check if the mutation for delete a contact is successful and calls a toast from react-hot-toast
  const checkDeleteErrors = async (data: any) => {
    //checks if exist the property err _or_ if the property _contactHasDeleted_ is false
    if (data?.deleteContact?.err || data.deleteContact?.contactHasDeleted === false) {
      //calls an error toast and prints the error description
      toast.error(`${data?.deleteContact?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.deleteContact?.contactHasDeleted === true) {
      //f the property _contactHasDeleted is true calls a success toast an calls the method refetch to pulls the most actual data after the mutation is completed.
      toast.success('Contact Deleted');
      await refetch();
    }
  }

  // works same at the previous function but with the createContact mutation
  const checkErrors = async (data: any) => {
    if (data?.createContact?.err || data.createContact?.contactHasCreated === false) {
      toast.error(`${data?.createContact?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.createContact?.contactHasCreated === true) {
      toast.success('Contact Added');
      setOpen(false);
      await refetch();
    }
  }

  return (
    <>
      <Navigation />
      <section className="mt-16 text-blueGray-700">
        <div className="container items-center px-5 py-8 mx-auto lg:px-24">
          <div className="flex flex-wrap mb-12 text-left">
            {/* maps the contacts array from the data in the getContacts query */}
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
