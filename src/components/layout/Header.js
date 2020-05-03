import React, { Fragment } from 'react';

const Header = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-dark indigo'>
        <img
          src='https://cdn.pixabay.com/photo/2013/04/01/09/22/warm-98534_1280.png'
          className='mr-3'
          style={{ height: '2.5rem' }}
          alt='Weather Icon'
        />
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li
              className='nav-item'
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <a className='nav-link' href='https://github.com/scottjr101/LoadUpCodeChallenge'>
                Github Repo
              </a>
            </li>
            <li
              className='nav-item'
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <a className='nav-link' href='https://scottladd.herokuapp.com/'>
                My Portfolio
              </a>
            </li>
            {/* <li
              className='nav-item'
              data-toggle='collapse'
              data-target='.navbar-collapse.show'
            >
              <a className='nav-link' href='#'>
                Pricing
              </a>
            </li> */}
          </ul>
          <span className='navbar-text white-text'>LoadUp Code Challenge</span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
