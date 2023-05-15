import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
// import { Navigate, useParams } from 'react-router-dom';
// import Auth from '../utils/auth';
import { useQuery, useMutation, gql } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations"
import { saveFriend } from "../utils/localStorage";




const Friends = () => {

    const { loading, data } = useQuery(QUERY_USERS);
    const [saveFriend, { loading: savingFriend, error }] = useMutation(ADD_FRIEND);
    const [friend, setFriend] = useState('');

    useEffect(() => {
        return () => {
            const friendUsername = saveFriend();
            saveFriend('username');
        };
    }, []);

    const loggedInUser = localStorage.getItem('username');
    console.log(loggedInUser)

    const handleSaveFriend = async (friendUsername) => {
        setFriend(friendUsername)
        console.log("handleSaveFriend")
        console.log(friendUsername)

        try {
            const { data } = await saveFriend({
                variables: { friend: { username: friendUsername } }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    };

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    console.log(data)

    return (
        <>
            {/* <div> */}
            <div className="flex-row justify-center mb-3">
                <h1>All Users</h1>
                <div className="friend-group">
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: 2 }).map((_, idx) => (

                            <ul>
                                <Col>
                                    {data.users.map((user, i) => (
                                        (i + idx) % 2
                                            ? null
                                            : <Card border="dark" className="friend-card" >
                                                <Card.Body key={user.username} border="dark" >
                                                    <Card.Title>{user.username}</Card.Title>
                                                    <p>
                                                        <strong> Book lists: </strong> {user.savedBooks.slice(0, 5).map((book) => book.title).join(", ") || ["No books to display."]}
                                                    </p>
                                                    <p>
                                                        <strong>TV Show lists:</strong> {user.savedTvShows.slice(0, 5).map((show) => show.name).join(", ") || ["No tv shows to display."]}
                                                    </p>
                                                    <p>
                                                        <strong>Friends:</strong> {user.savedFriends.slice(0, 5).map((friend) => friend.username).join(", ") || ["No friends to display."]}
                                                    </p>
                                                    {user.username !== loggedInUser && (
                                                        <Button className="join-btn" onClick={() => handleSaveFriend(user.username)}>
                                                            {savingFriend ? "Friend Saved"
                                                                : "Add Friend"}
                                                        </Button>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                    ))}
                                </Col>
                            </ul>
                        ))}
                    </Row>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};
export default Friends;
