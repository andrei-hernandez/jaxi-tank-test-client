import React from 'react';
import Navigation from '../Navigation';
import Content from './Content';

const Home = (): JSX.Element => {
  return (
    <div>
      <Navigation />
      <Content />
    </div>
  );
}

export default Home;
