import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements';

// Navbar helps the user navigate the site and changes based on be in logged in or out
const NavBar = () => {
    return (
      <>
      <div className='nav-background'>
        <Nav>
          <Bars />
          <NavMenu>
          <Link className="text-light" to="/">
            <h1 className="m-0 main-title">My Yearly Record</h1>
          </Link>
            <NavLink to='/search' activeStyle>
              Search
            </NavLink>
            <NavLink to='/friends' activeStyle>
              All Users
            </NavLink>
          <div>
          <Header />
          </div>
          </NavMenu>
        </Nav>
        </div>
        <div className="container vw-100">

        </div>
      </>
    );
  };
    
  export default NavBar;