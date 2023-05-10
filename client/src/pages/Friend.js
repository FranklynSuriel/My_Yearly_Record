import React from "react";
import { Card } from "react-bootstrap";
// import { Navigate, useParams } from 'react-router-dom';
// import Auth from '../utils/auth';
import { useQuery, useMutation, gql } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations"




const Friends = () => {

    const { loading, data, error } = useQuery(QUERY_USERS);
    const [saveFriend, { loading: savingFriend }] = useMutation(ADD_FRIEND);

    const handleSaveFriend = (username, friendUsername) => {
        saveFriend({
            variables: { username, friendUsername },
            update: (cache, { data: { saveFriend } }) => {
                cache.modify({
                    fields: {
                        users(existingUsers = []) {
                            const newFriendRef = cache.writeFragment({
                                data: saveFriend,
                                fragment: gql`
                                fragment NewFriend on User {
                                    savedFriends {
                                        username
                                    }
                                }`
                            });
                            return [existingUsers, newFriendRef];
                        }
                    }
                });
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

    return (
        <>
            <div>
                <div className="flex-row justify-center mb-3">
                    <h1>All Users</h1>
                    <ul>
                        {data.users.map((user) => (
                            <Card border="dark" >
                                <Card.Body key={user.username} border="dark" >
                                    <Card.Title>{user.username}</Card.Title>
                                    <p>
                                        <strong> Book lists: </strong> {user.savedBooks.slice(0, 5).map((book) => book.title).join(", ") || ["No books to display."]}
                                    </p>
                                    <p>
                                        <strong>TV Show lists:</strong> {user.savedTvShows.map((show) => show.name).join(", ") || ["No tv shows to display."]}
                                    </p>
                                    <p>
                                        <strong>Friends:</strong> {user.savedFriends.map((friend) => friend.username).join(", ") || ["No friends to display."]}
                                    </p>
                                    {/* {user.username !== loggedInUser.username && (
                                        <button onClick={() => handleSaveFriend(loggedInUser.username, user.username)}>
                                            {savingFriend ? "Saving friend..." : "Save friend"}
                                        </button>
                                    )} */}
                                    {/* {Auth.loggedIn() && (
											<Button
												disabled={savedReadBookIds?.some(
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
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Friends;
