import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK, REMOVE_SHOW } from "../utils/mutations";
import { removeReadBookIds } from "../utils/localStorage";
import Auth from "..utils/auth";
import { removeWatchedShowIds } from "../utils/mutations";

const SavedBooks = () => {
	const { loading, data: userData } = useQuery(GET_ME);
	const [removeBook] = useMutation(REMOVE_BOOK);
	// const [userData, setUserData] = useState({savedBooks: []});

	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeBook({
				variables: { bookId },
			});

			userData.me.savedBooks = userData.me.savedBooks.filter(
				(book) => book.bookId !== bookId
			);

			removeReadBookIds(bookId);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <h2>Loading...</h2>;
	}

    const savedBooks = userData.me.savedBooks

	return (
		<>
			<div fluid className="text-light bg-dark p-5">
				<Container>
					<h1> Viewing saved books</h1>
				</Container>
			</div>
			<Container>
				<h2 className="pt-5">
					{savedBooks.length
						? `Viewing ${savedBooks.length} saved ${
								savedBooks.length === 1 ? "book" : "books"
						  }:`
						: "You have no saved books."}
				</h2>
				<Row>
					{savedBooks.map((book) => {
						return (
							<Col md="4">
								<Card key={book.bookId} border="light">
									{book.image ? (
										<Card.Img
											src={book.image}
											alt={`The cover image of ${book.title}`}
											variant="top"
										/>
									) : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className="small">Authors: {book.authors}</p>
										<Card.Text>{book.description}</Card.Text>
										<Button
											className="btn-block btn-danger"
											onClick={() => handleDeleteBook(book.bookId)}
										>
											Remove this Book.
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};

const SavedShows = () => {
	const { loading, data: userData } = useQuery(GET_ME);
	const [removeShow] = useMutation(REMOVE_SHOW);
	// const [userData, setUserData] = useState({savedShows: []})

	const handleDeleteShow = async (tvShowsId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeShow({
				variables: { tvShowsId },
			});

			userData.me.savedShows = userData.me.savedShows.filter(
				(show) => show.tvShowsId !== tvShowsId
			);

			removeWatchedShowIds(tvShowsId);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <h2>Loading...</h2>;
	}

    const savedShows = userData.me.savedShows

	return (
		<>
			<div fluid className="text-light bg-dark p-5">
				<Container>
					<h1> Viewing saved tv shows</h1>
				</Container>
			</div>
			<Container>
				<h2 className="pt-5">
					{savedShows.length
						? `Viewing ${savedShows.length} saved ${
								savedShows.length === 1 ? "show" : "shows"
						  }:`
						: "You have no saved shows."}
				</h2>
				<Row>
					{savedShows.map((show) => {
						return (
							<Col md="4">
								<Card key={show.tvShowsId} border="light">
									{show.image ? (
										<Card.Img
											src={show.image}
											alt={`The cover image of ${show.title}`}
											variant="top"
										/>
									) : null}
									<Card.Body>
										<Card.Title>{show.title}</Card.Title>
										<p className="small">Authors: {show.authors}</p>
										<Card.Text>{show.description}</Card.Text>
										<Button
											className="btn-block btn-danger"
											onClick={() => handleDeleteShow(show.tvShowsId)}
										>
											Remove this Show.
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};

export default {
	SavedBooks,
	SavedShows,
};
