import React, { Fragment, Component } from 'react';
import { MyContext } from '../context/MyProvider';
import chart from '../../assets/img/forecast-chart.png';
import { Weather } from './DisplayedWeather';
import { MDBModal } from 'mdbreact';

class CurrentWeather extends Component {
  state = {
    modal4: false,
  };

  toggle = () => {
    this.setState({
      modal4: !this.state.modal4,
    });
  };

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <Fragment>
            <div className='m-1 m-lg-5'>
              <section className='dark-grey-text p-5'>
                <div className='row'>
                  {/* img */}
                  <div className='col-lg-5 mb-4 mb-md-0'>
                    <div className='view'>
                      <img src={chart} className='img-fluid' alt='sample' />
                    </div>
                  </div>
                  {/* img end */}
                  <div className='col-lg-7 mb-lg-0 mb-4'>
                    <h3 className='font-weight-bold my-3'>
                      Weather in your area
                    </h3>
                    <p className='text-muted mb-4 pb-2'>
                      Click the "Coordinates" button to allow your browser to
                      access your geolocation and grab the latitude and
                      longitude needed. You will need to allow this site access
                      to your location to preform this, if you uncomfortable
                      with this. Please enter your zipcode in the input field
                      below.
                    </p>
                    <div className='d-inline d-md-flex justify-content-between'>
                      {/* button */}
                      <button
                        className='btn btn-md btn-light-blue mt-0 mx-0 mb-3'
                        onClick={() => {
                          this.toggle();
                          context.getLocation();
                        }}
                      >
                        Coordinates
                      </button>
                      {/* button end */}
                      <MDBModal
                        isOpen={this.state.modal4}
                        toggle={this.toggle}
                        size='lg'
                      >
                        <Weather />
                        <button
                          className='btn btn-secondary mx-2 mx-lg-4 mb-lg-4 mt-lg-2'
                          onClick={this.toggle}
                        >
                          Close
                        </button>
                      </MDBModal>
                      {/* zipcode input */}
                      <form onSubmit={(e) => context.onSubmit(e)}>
                        <div className='input-group'>
                          <input
                            type='zipcode'
                            value={context.zipcode}
                            placeholder='30345'
                            minLength='5'
                            onChange={(e) => context.onChange(e)}
                          />
                          <div className='input-group-append'>
                            <button
                              className='btn btn-md btn-secondary rounded-right m-0 px-3 py-2 z-depth-0 waves-effect'
                              type='submit'
                              value='Zipcode'
                              onClick={this.toggle}
                            >
                              Enter
                            </button>
                          </div>
                        </div>
                        <small className='form-text black-text'>
                          <strong>* Enter a vaild US 5-digit zipcode.</strong>
                        </small>
                      </form>
                      {/* zipcode input end */}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

export default CurrentWeather;
