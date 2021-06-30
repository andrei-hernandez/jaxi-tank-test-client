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

  return (
    <div>
      {isLoggedIn && <Redirect to="/signin" />}
      <Content />
    </div>
  );
}

export default Contacts;
