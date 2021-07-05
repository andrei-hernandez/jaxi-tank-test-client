import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { LOG_IN } from '../../Queries';
import SignInForm from './SignInForm';
import toast, { Toaster } from 'react-hot-toast';

const SignIn = (): JSX.Element => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [redir, setredir] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setredir(true);
    } else {
      setredir(false);
    }
  }, [redir]);

  //check if the token exists in the localStorage and if exists redirects to home route using the useEfect hook. 

  // apollo useLazyQuery to makes the login process and is complete store the session data in the localStorage.
  const [logIn] = useLazyQuery(LOG_IN, {
    onCompleted: (data: any) => storeSessionData(data),
    fetchPolicy: "network-only"
  }
  );

  // event handler to gets the user input 
  const handleInputChange = (e: any): void => {
    const { target } = e;
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  }

  // event handler to calls the login query
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    logIn({ variables: { email, password } });
  }

  // check if _err_ exists in the login query data
  const storeSessionData = (data: any) => {
    if (data?.accountLogIn?.err !== null && data?.accountLogIn?.err !== undefined) {
      toast.error(`${data?.accountLogIn?.err?.errorDesc}`);
    } else if (data?.accountLogIn?.err === null || data?.accountLogIn?.err === undefined) {
      //if _err_ don't exists store the session data in the localStorage and redirect to homePage
      toast.success('Logged!');
      localStorage.setItem('token', data?.accountLogIn?.token);
      localStorage.setItem('userId', data?.accountLogIn?.userId);
      localStorage.setItem('avatar', data?.accountLogIn?.avatar);
      localStorage.setItem('userName', data?.accountLogIn?.userName);
      setredir(true);
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {redir && <Redirect to="/" />}
      <SignInForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </>
  );
}

export default SignIn;
