
import React, { useState } from 'react';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import Search from './Search';
import Profile from './Profile';


export default function App() {
  const [currentPage, setCurrentPage] = useState('');

  const renderPage = () => {
    // if (currentPage === 'Home') {
    //   return < />;
    // }
    if (currentPage === 'Search') {
      return <Search />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className='App'>
    <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
    {renderPage()}
    <br />
    <Footer />
    </div>
  );
}
