import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { LOG_IN } from '../../Queries';
import SignInForm from './SignInForm';

const SignIn = (): JSX.Element => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [logIn] = useLazyQuery(LOG_IN, {
    onCompleted: (data: any) => storeSessionData(data),
    fetchPolicy: "network-only"
  }
  );

  const handleInputChange = (e: any): void => {
    const { target } = e;
    if (target.name === 'email') {
      setEmail(target.value);
      console.log(target.value);
    }
    if (target.name === 'password') {
      console.log(target.value);
      setPassword(target.value);
    }
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    logIn({ variables: { email, password } });
  }

  const storeSessionData = (data: any) => {
    localStorage.setItem('token', data?.accountLogIn?.token);
    localStorage.setItem('userId', data?.accountLogIn?.userId);
    localStorage.setItem('avatar', data?.accountLogIn?.avatar);
    localStorage.setItem('userName', data?.accountLogIn?.userName);
    setIsLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? <Redirect to="/" /> : <SignInForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
    </>
  );
}

export default SignIn;
