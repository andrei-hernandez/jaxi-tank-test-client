import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { ADD_USER, LOG_IN } from '../../Queries';
import SignUpForm from './SignUpForm';

const SignUp = (): JSX.Element => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | any>(false);
  const [token, setToken] = useState<string | any>(localStorage.getItem('token'));
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, token]);

  const handleInputChange = (e: any) => {
    const { target } = e;
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'userName') {
      setUserName(target.value);
    }
    if (target.name === 'avatar') {
      setAvatar(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addUser({ variables: { email, password, avatar, userName } });
  }

  const [addUser] = useMutation(ADD_USER, {
    onCompleted: (data: any) => checkErrors(data)
  });

  const [logIn] = useLazyQuery(LOG_IN, {
    onCompleted: (data: any) => {
      storeSessionData(data);
    }
  });

  const checkErrors = (data: any) => {
    if (data?.createUser?.err || data.createUser?.hasCreated === false) {
      toast.error(`${data?.createUser?.err?.errorDesc}, use another email`, { duration: 2300, });
    } else if (data.createUser?.hasCreated === true) {
      toast.success('Account Created');
      logIn({ variables: { email, password } });
    }
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
      setIsLoggedIn(true);
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {isLoggedIn && <Redirect to="/" />}
      <SignUpForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </>
  );
}

export default SignUp;
