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

  return (
    <div>
      <Content />
    </div>
  );
}

export default Projects;
