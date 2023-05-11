import React, { useState } from 'react';
import { Navbar, Nav, Container, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ToggleSwitch from './toggleSwitch';
import { Button, Space } from 'antd';
import Modal from './Modal';
import SignUpModal from './SignUpModal';
import Auth from '../utils/auth';



function NavBar() {
    // const [openModal, setOpenModal] = useState(false);
    // const [openSignModal, setOpenSignModal] = useState(false);
    return (
        <Navbar className="menu">
            <h1 id='title'>My Yearly Record</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/search"> Search </Link>
                </li>
                <li className="nav-item">
                    {/* //     onClick={() => handlePageChange('Search')}
                    //     className={currentPage === 'Search' ? 'nav-link active' : 'nav-link'} */}
                </li>
                <li className="nav-item">
                    <Link to="/profiles/:profileId"> Profile </Link>
                </li>
                <li className="nav-item">
                    <Link to="/"> Friends </Link>
                </li>
            </ul>
            {/* <Space wrap>
                <Button type='dashed' className="openModalBtn" onClick={() => {
                    setOpenModal(true);
                }}>Login</Button>
                {openModal && <Modal closeModal={setOpenModal} />}

                <Button type='dashed' className="openModalBtn" onClick={() => {
                    setOpenSignModal(true);
                }}>Sign-Up</Button>
                {openSignModal && <SignUpModal closeModal={setOpenSignModal} />}
            </Space> */}
        </Navbar>


    );
}

export default NavBar;
// 