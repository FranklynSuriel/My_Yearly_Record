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
};

function Saved() {
	return (
		<>
			<div fluid className="text-light bg-dark p-5">
				<Container>
					<h1> Viewing saved books and tv shows</h1>
				</Container>
			</div>
			<Container>
				<Row>
					<Col>
						<h2 className="pt-5">Saved Books</h2>
						<SavedBooks />
					</Col>
					<Col>
						<h2 className="pt-5">Saved TV Shows</h2>
						<SavedShows />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Saved;
