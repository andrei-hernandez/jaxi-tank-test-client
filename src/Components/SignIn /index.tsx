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

  const [logIn] = useLazyQuery(LOG_IN, {
    onCompleted: (data: any) => storeSessionData(data),
    fetchPolicy: "network-only"
  }
  );

  const handleInputChange = (e: any): void => {
    const { target } = e;
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    logIn({ variables: { email, password } });
  }

  const storeSessionData = (data: any) => {
    if (data?.accountLogIn?.err !== null && data?.accountLogIn?.err !== undefined) {
      toast.error(`${data?.accountLogIn?.err?.errorDesc}`);
    } else if (data?.accountLogIn?.err === null || data?.accountLogIn?.err === undefined) {
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
