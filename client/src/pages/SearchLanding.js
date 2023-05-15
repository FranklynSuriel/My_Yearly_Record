import React from "react";
import {  Button } from "react-bootstrap";

function SearchLanding() {
    return (
        <div className="search-landing">
            <h1>What do you want to search?</h1>
            <div className="searchland-container">
            <Button href="/books" className='search-btn'>Books</Button>
            <Button href="/tvshows" className="search-btn">TV Shows</Button>
            </div>
        </div>
        
    )
}

export default SearchLanding;
