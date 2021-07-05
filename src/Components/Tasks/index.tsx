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

  //check if the token exists in the localStorage and if is null redirects to signin route using the useEfect hook. 

  return (
    <div>
      <Navigation />
      <AllTasks />
    </div>
  );
}

export default Tasks;
