import React, { Fragment, Component, useState } from 'react';
import './App.css';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
const MyProvider = (props) => {

const [age, setAge] = useState(100);

    return (
      <MyContext.Provider
        value={{
          state: setAge,
          getLocation: () =>
            setAge(
              age + 1
            )
        }}
      >
        {props.children}
      </MyContext.Provider>
    );
}

const App = () => {
  return (
    <Fragment>
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <Fragment>
              <p>Age: {context.age}</p>
              <button onClick={context.getLocation}>Click Here</button>
            </Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    </Fragment>
  );
};

export default App;
