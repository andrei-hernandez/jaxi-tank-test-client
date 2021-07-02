import { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import AllTasks from './AllTasks';

const Tasks = () => {

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
      <Navigation />
      <AllTasks />
    </div>
  );
}

export default Tasks;
