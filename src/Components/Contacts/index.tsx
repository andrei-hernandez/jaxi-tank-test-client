import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Content from './Content';

const Contacts = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  //check if the token exists in the localStorage and if is null redirects to signin route using the useEfect hook.

  return (
    <div>
      {isLoggedIn && <Redirect to="/signin" />}
      <Content />
    </div>
  );
}

export default Contacts;
