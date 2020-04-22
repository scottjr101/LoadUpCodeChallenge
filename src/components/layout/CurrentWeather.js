import React, { Fragment } from 'react';
import { MyContext } from '../context/MyProvider';

const CurrentWeather = () => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <Fragment>
          {/* Card */}
          <div className='card card-image cardbg'>
            {/* Content */}
            <div className='text-white text-center align-items-center rgba-black-slight py-4 px-4'>
              <div>
                <h2 className='mb-2'>
                  Click the button below to the get weather imformation for your
                  area
                </h2>
                <button
                  className='btn btn-light-blue'
                  onClick={context.getLocation}
                >
                  By Lat & Long
                </button>
                <form onSubmit={e => context.onSubmit(e)}>
                  <input
                    type='zipcode'
                    value={context.zipcode}
                    placeholder='Enter Here'
                    minLength='5'
                    onChange={e => context.onChange(e)}
                  />
                  <input
                    type='submit'
                    value='Zipcode'
                    className='btn btn-secondary'
                  />
                </form>
              </div>
            </div>
          </div>
          {/* Card */}
        </Fragment>
      )}
    </MyContext.Consumer>
  );
};

export default CurrentWeather;
