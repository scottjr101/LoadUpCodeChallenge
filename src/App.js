import React, { Fragment, Component } from 'react';
import './App.css';

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
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          weather: this.state.weather,
          getLocation: () => {
            window.navigator.geolocation.getCurrentPosition(success =>
              this.setState({
                latitude: success.coords.latitude,
                longitude: success.coords.longitude
              })
            );
            setTimeout(() => {
              fetch(
                'https://api.openweathermap.org/data/2.5/weather?lat=' +
                  this.state.latitude +
                  '&lon=' +
                  this.state.longitude +
                  '&appid=1eab387463d70063b7d8296fa6d64c9b'
              )
                .then(res => res.json())
                .then(result => {
                  this.setState({
                    weather: [result]
                  });
                })
                .catch(error => this.setState({ error }));
            }, 500);
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <Fragment>
              <p>Latitude: {context.latitude}</p>
              <p>Longitude: {context.longitude}</p>
              {context.weather.map(data =>
              <Fragment>
              <p key={data.id}>City: {data.name}</p>
              <p key={data.id}>Temp: {data.main.temp}</p>
              </Fragment>
                )}
              <button onClick={context.getLocation}>Current Weather</button>
            </Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    </Fragment>
  );
};

export default App;
