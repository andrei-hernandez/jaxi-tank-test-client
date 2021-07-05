import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { ADD_USER, LOG_IN } from '../../Queries';
import SignUpForm from './SignUpForm';

const SignUp = (): JSX.Element => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | any>(false); // manage the redirect state
  const [token, setToken] = useState<string | any>(localStorage.getItem('token')); // store the token from the localStorage
  const [email, setEmail] = useState<string>(''); // manage the email from the user input
  const [userName, setUserName] = useState<string>(''); // manage the email from the user input
  const [avatar, setAvatar] = useState<string>(''); // manage the email from the user input
  const [password, setPassword] = useState<string>(''); // manage the email from the user input

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, token]);

  //check if the token exists in the localStorage and if is null redirects to home route using the useEfect hook. 

  // event hanler to store each field of the form and store in the state
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

  // apollo useMutation hook to create a user account.
  const [addUser] = useMutation(ADD_USER, {
    onCompleted: (data: any) => checkErrors(data)
  });

  // event hanler to calls the addUser Mutation.
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addUser({ variables: { email, password, avatar, userName } });
  }

  // apollo useLazyQuery hook to login after the account creation
  const [logIn] = useLazyQuery(LOG_IN, {
    onCompleted: (data: any) => {
      storeSessionData(data);
    }
  });


  // check if _err_ exists in the create account mutation.
  const checkErrors = (data: any) => {
    if (data?.createUser?.err || data.createUser?.hasCreated === false) {
      toast.error(`${data?.createUser?.err?.errorDesc}, use another email`, { duration: 2300, });
    } else if (data.createUser?.hasCreated === true) {
      // if _err_ don't exists call the login Lazy Querys
      toast.success('Account Created');
      logIn({ variables: { email, password } });
    }
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
