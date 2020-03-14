import React, { Component } from 'react';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  state = {
    latitude: null,
    longitude: null,
    weather: [],
    error: null
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          weather: this.state.weather,
          getLocation: () => {
            if (!window.navigator.geolocation) {
              alert('Geolocation is not supported by your browser');
            } else {
              window.navigator.geolocation.getCurrentPosition(success => {
                this.setState({
                  latitude: success.coords.latitude,
                  longitude: success.coords.longitude
                });
                fetch(
                  'https://api.openweathermap.org/data/2.5/weather?lat=' +
                    this.state.latitude +
                    '&lon=' +
                    this.state.longitude +
                    '&units=imperial&appid=1eab387463d70063b7d8296fa6d64c9b'
                )
                  .then(res => res.json())
                  .then(result => {
                    this.setState({
                      weather: [result]
                    });
                  })
                  .catch(error => this.setState({ error }));
              });
            }
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { MyContext, MyProvider };
