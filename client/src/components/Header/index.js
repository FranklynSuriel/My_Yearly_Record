import React from 'react';
import { Link } from 'react-router-dom';


import Auth from '../../utils/auth';

// Header is an component inside of the navbar.

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
       
        </div>
        <div className='header-container'>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2 profile-btn" to="/Profile">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button Redirect to={'/'}  className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2 login-btn" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2 sign-btn" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
