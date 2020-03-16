import React, { Fragment } from 'react';
import './App.css';
import { MyProvider } from './components/MyProvider';
import { Weather } from './components/DisplayedWeather';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <Fragment>
          <Header />
          <div className='container my-4'>
            <CurrentWeather />
            <Weather />
          </div>
        </Fragment>
      </MyProvider>
    </Fragment>
  );
};

export default App;
