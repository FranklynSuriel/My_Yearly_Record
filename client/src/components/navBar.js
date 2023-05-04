import React, { useState } from 'react';
// import styled from 'styled-components'
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ToggleSwitch from './toggleSwitch';
//


function NavBar() {
    return(
        <nav className="menu">
            <h1 id='title'>My Yearly Record</h1>
            <ToggleSwitch />
            <button>Login</button>
            <button>Signup</button>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                <Link to="/search">Search</Link>
                </li>
                <li className="nav-item">
                    {/* //     onClick={() => handlePageChange('Search')}
                    //     className={currentPage === 'Search' ? 'nav-link active' : 'nav-link'} */}
                </li>
                <li className="nav-item">
                   <Link to="/profiles/:profileId">Profile</Link>                                   
                </li>
                <li className="nav-item">
                <Link to="/">Friends</Link>
                </li>
            </ul>
        </nav>
        

    );
}

export default NavBar;