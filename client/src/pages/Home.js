
import React, { useState } from 'react';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import Search from './Search';
import Profile from './Profile';
import Landing from './Landing';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { render } from "react-dom";



  
export default function App() {

  const [currentPage, setCurrentPage] = useState('');
  
  const renderPage = () => {
    if (currentPage === 'Landing') {
      return <Landing />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    if (currentPage === 'Search') {
      return <Search />;
    }
    // return <Resume />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className='App'>
    <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
    {/* <Landing /> */}
    {renderPage()}
    <br />
    <Footer />
    </div>
  );
}
