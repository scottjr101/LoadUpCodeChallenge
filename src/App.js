import React, { Fragment, Component } from 'react';
import Moment from 'react-moment';
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

const Weather = () => {
  return (
    <Fragment>
      <MyContext.Consumer>
        {context => (
          <Fragment>
            {context.weather.map(data => (
              <Fragment key={data.id}>
                <div className='jumbotron card card-image jumboTronbg mt-4'>
                  <div className='text-white'>
                    <h1 className='card-title h1-responsive mb-5 font-bold text-center'>
                      Weather information from the{' '}
                      <a href='https://openweathermap.org/'>OpenWeather API</a>
                    </h1>
                    <div className='row'>
                      <div className='col-md-6'>
                        <ul>
                          <li>City Name: {data.name}</li>
                          <li>Current Longitude: {data.coord.lon}</li>
                          <li>Current Latitude: {data.coord.lat}</li>
                          <li>Current Temp: {data.main.temp} °F</li>
                          <li>Feels Like Temp: {data.main.feels_like} °F</li>
                          <li>Minimum Temp: {data.main.temp_min} °F</li>
                          <li>Maximum Temp: {data.main.temp_max} °F</li>
                          <li>Wind Speed: {data.wind.speed} MPH</li>
                          <li>Wind Direction: {data.wind.deg} °</li>
                          {data.wind.gust === undefined ? (
                            <li>Wind Gust: N/A</li>
                          ) : (
                            <li>
                              Wind Gust: {data.wind.gust}{' '}
                              <i className='fas fa-wind' />
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className='col-md-6'>
                        <ul>
                          <li>
                            Sunrise: <Moment unix>{data.sys.sunrise}</Moment>{' '}
                          </li>
                          <li>
                            Sunset: <Moment unix>{data.sys.sunset}</Moment>{' '}
                          </li>
                          <li>
                            Humidity: {data.main.humidity}{' '}
                            <i className='fas fa-percentage' />
                          </li>
                          <li>
                            Atmospheric Pressure: {data.main.pressure} hPa
                          </li>
                          <li>
                            Visibility: {Math.round(data.visibility * 0.0006)}{' '}
                            miles
                          </li>
                          <li>
                            Cloudiness: {data.clouds.all}{' '}
                            <i className='fas fa-percentage' />
                          </li>
                          {data.weather[0].main === 'Rain' ? (
                            <li>
                              Rainfall in the past hour:{' '}
                              {Math.ceil(data.rain['1h'] * 0.0393 * 1000) /
                                1000}{' '}
                              inches
                            </li>
                          ) : (
                            <li>Rainfall in the past hour: N/A</li>
                          )}
                          <li>
                            Weather Condition: {data.weather[0].description}
                            <img
                              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                              alt='weather condition'
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </Fragment>
        )}
      </MyContext.Consumer>
    </Fragment>
  );
};

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <Fragment>
              <div className='container mt-4'>
                <div className='text-center'>
                  <h1 className='mb-3 customFont'>
                    LoadUp Engineering Coding Challenge
                  </h1>
                  <button
                    className='btn btn-light-blue'
                    onClick={context.getLocation}
                  >
                    Current Weather
                  </button>
                </div>
                <Weather />
              </div>
            </Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    </Fragment>
  );
};

export default App;
