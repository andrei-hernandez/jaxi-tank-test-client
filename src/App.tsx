import React from 'react';
import './App.css';
import SessionProvider from './Components/Context/Provider';
import Routes from './Routes';

function App(): JSX.Element {
  return (
    <SessionProvider>
      <Routes />
    </SessionProvider>
  );
}

export default App;
