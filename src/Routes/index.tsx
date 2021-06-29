import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import SessionContext from '../Components/Context';
import NotFound from '../Components/404';
import Contacts from '../Components/Contacts';
import Home from '../Components/Home';
import Projects from '../Components/Projects';
import SignIn from '../Components/SignIn ';
import SignUp from '../Components/SignUp ';
import Tasks from '../Components/Tasks';

const Routes = (): JSX.Element => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionData = useContext(SessionContext);

  useEffect(() => {
    const { token } = sessionData;
    if (token !== undefined !== null) {
      setIsLoggedIn(true);
    }
  }, [sessionData]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/signin">
          {isLoggedIn ? <SignIn /> : <Redirect to="/" />}
          <SignIn />
        </Route>
        <Route path="/signup">
          {isLoggedIn ? <SignUp /> : <Redirect to="/" />}
        </Route>
        <Route path="/projects">
          {isLoggedIn ? <Projects /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/tasks">
          {isLoggedIn ? <Tasks /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/contacts">
          {isLoggedIn ? <Contacts /> : <Redirect to="/signin" />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
