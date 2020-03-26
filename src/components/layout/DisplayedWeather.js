import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { MyContext } from '../context/MyProvider';

const Weather = () => {
  return (
    <Fragment>
      <MyContext.Consumer>
        {context => (
          <Fragment>
            {context.weather.map(data => (
              <Fragment key={data.id}>
                <div className='card p-4 weatherbg mt-4'>
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
                            Sunrise:{' '}
                            <Moment format='LLLL' unix>
                              {data.sys.sunrise}
                            </Moment>
                          </li>
                          <li>
                            Sunset:{' '}
                            <Moment format='LLLL' unix>
                              {data.sys.sunset}
                            </Moment>
                          </li>
                          <li>
                            Humidity: {data.main.humidity}{' '}
                            <i className='fas fa-percentage' />
                          </li>
                          <li>
                            Atmospheric Pressure: {data.main.pressure} hPa
                          </li>
                          {data.visibility === undefined ? (
                            <li>Visibility: N/A</li>
                          ) : (
                            <li>
                              Visibility: {Math.round(data.visibility * 0.0006)}{' '}
                              miles
                            </li>
                          )}
                          <li>
                            Cloudiness: {data.clouds.all}{' '}
                            <i className='fas fa-percentage' />
                          </li>
                          <li>
                            Weather Condition: {data.weather[0].description}
                            <img
                              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                              alt='weather condition'
                            />
                          </li>
                          {data.weather[0].main === 'Rain' ? (
                            <li>
                              Rainfall in the past hour:{' '}
                              {Math.ceil(data.rain['1h'] * 0.0393 * 1000) /
                                1000}{' '}
                              inches
                            </li>
                          ) : (
                            <p></p>
                          )}
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

export { Weather };
