import React, { useState, useEffect, createContext } from 'react';

// first we will make a new context
const MyContext = createContext();

// Then create a provider Component
const MyProvider = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState([]);

  // Setup variables for fetch parameter
  const data = { latitude, longitude };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const getCoords = () => {
    !window.navigator.geolocation
      ? alert('Geolocation is not supported by your browser')
      : window.navigator.geolocation.getCurrentPosition((success) => {
          setLatitude(success.coords.latitude);
          setLongitude(success.coords.longitude);
        });
  };

  useEffect(() => {
    latitude === null || longitude === null
      ? console.log('Not Ready')
      : fetch('https://scottladd.herokuapp.com/weather', options)
          .then((res) => res.json())
          .then((result) => setWeather([result]))
          .catch((error) => console.log(error));
          // eslint-disable-next-line
  }, [latitude, longitude]);

  return (
    <MyContext.Provider
      value={{
        getLocation: getCoords,
        weather,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
