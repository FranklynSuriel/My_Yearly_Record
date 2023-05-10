import React from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const Friends = () => {

    const { loading, data } = useQuery(QUERY_USERS)

    // const user = data?.user || {};
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <div className="flex-row justify-center mb-3">
                    <h1>All Users</h1>
                    <ul>
                        {data.users.map((user) => (
                            <Container className="d-flex flex-wrap flex-column">
                            <Card border="dark" >
                            <Card.Body key={user.id} border="dark" >
                            <Card.Title>{user.username}</Card.Title>
										<p className="small">Email: {user.email}</p>
										{/* <Card.Text style={{maxHeight: "75px", overflowY: "auto"}}>{user.email}</Card.Text> */}
										{/* {Auth.loggedIn() && (
											<Button
												disabled={saveReadBookIds?.some(
													(savedBookId) => savedBookId === book.bookId
												)}
												className="btn-block btn-info"
												onClick={() => handleSaveBook(book.bookId)}
											>
												{saveReadBookIds?.some(
													(savedBookId) => savedBookId === book.bookId
												)
													? "This book has already been saved!"
													: "Save this Book!"}
											</Button>
										)} */}

                            </Card.Body>
                           </Card>
                           </Container>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Friends;
