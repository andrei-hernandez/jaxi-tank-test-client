import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Content from './Content';

const Home = (): JSX.Element => {

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
    <>
      <Content />
      {isLoggedIn && <Redirect to="/signin" />}
    </>
  );
}

export default Home;
