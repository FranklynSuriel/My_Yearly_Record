import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Search from './pages/Search';
import NavBar from './components/navBar';
import Landing from './pages/Landing';
import Signup from './components/Signup.js';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <NavBar />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Landing />} 
              />
               <Route 
                path="/search" 
                element={<Search />} 
              />
              <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              />
               <Route 
                path="/signup" 
                element={<Signup />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;