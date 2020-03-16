import React, { useState, useEffect, createContext } from 'react';

// first we will make a new context
const MyContext = createContext();

// Then create a provider Component
const MyProvider = props => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);

  const getCoords = () => {
    !window.navigator.geolocation
      ? alert('Geolocation is not supported by your browser')
      : window.navigator.geolocation.getCurrentPosition(success => {
          setLatitude(success.coords.latitude);
          setLongitude(success.coords.longitude);
        });
  };

  useEffect(() => {
    latitude === null || longitude === null
      ? console.log('Not Ready')
      : fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            latitude +
            '&lon=' +
            longitude +
            '&units=imperial&appid=1eab387463d70063b7d8296fa6d64c9b'
        )
          .then(res => res.json())
          .then(result => setWeather([result]))
          .catch(error => console.log(error));
  }, [latitude, longitude, setWeather]);

  return (
    <MyContext.Provider
      value={{
        getLocation: getCoords,
        weather
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
