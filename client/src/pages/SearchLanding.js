import React from "react";
import { Container, Col, Form, Button, Card, Row, Dropdown, DropdownButton } from "react-bootstrap";

function SearchLanding() {
    return (
        <div className="search-landing">
            <h1>What do you want to add?</h1>
            <div className="searchland-container">
            <Button href="/books" className='search-btn'>Books</Button>
            <Button href="/tvshows" className="search-btn">TV Shows</Button>
            </div>
        </div>
        
    )
}

export default SearchLanding;
