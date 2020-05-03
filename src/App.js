import React, { Fragment } from 'react';
import './App.css';
import { MyProvider } from './components/context/MyProvider';
import Header from './components/layout/Header';
import CurrentWeather from './components/layout/CurrentWeather';

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <Fragment>
          <Header />
          <CurrentWeather />
        </Fragment>
      </MyProvider>
    </Fragment>
  );
};

export default App;
