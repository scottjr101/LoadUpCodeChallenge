import React, { Fragment } from 'react';
import './App.css';
import { MyProvider } from './components/context/MyProvider';
import { Weather } from './components/layout/DisplayedWeather';
import Header from './components/layout/Header';
import CurrentWeather from './components/layout/CurrentWeather';

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <Fragment>
          <Header />
          <CurrentWeather />
          <Weather />
        </Fragment>
      </MyProvider>
    </Fragment>
  );
};

export default App;
