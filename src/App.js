import React, { Fragment, Component } from 'react';
import './App.css';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  state = { latitude: null, longitude: null };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(success =>
      this.setState({
        latitude: success.coords.latitude,
        longitude: success.coords.longitude
      })
    );
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          latitude: this.state.latitude,
          longitude: this.state.longitude
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
              <button onClick={context.getLocation}>Click Here</button>
            </Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    </Fragment>
  );
};

export default App;
