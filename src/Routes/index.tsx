import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NotFound from '../Components/404';
import Contacts from '../Components/Contacts';
import Home from '../Components/Home';
import Profile from '../Components/Profile';
import Projects from '../Components/Projects';
import SignIn from '../Components/SignIn ';
import SignUp from '../Components/SignUp ';
import Tasks from '../Components/Tasks';

const Routes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
