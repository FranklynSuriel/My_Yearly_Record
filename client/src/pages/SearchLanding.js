import React from "react";
import { Container, Col, Form, Button, Card, Row, Dropdown, DropdownButton } from "react-bootstrap";

function SearchLanding() {
    return (
        <div>
            <h1>What do you want to add?</h1>
            <Button href="/books">Books</Button>
            <Button href="/tvshows">TV Shows</Button>
        </div>
        
    )
}

export default SearchLanding;
