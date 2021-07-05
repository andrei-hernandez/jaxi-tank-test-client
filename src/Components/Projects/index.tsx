import React, { useEffect, useState } from 'react';
import Content from './Content';

const Projects = () => {

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
      <Content />
    </div>
  );
}

export default Projects;
