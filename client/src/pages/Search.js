import React, { useState, useEffect } from "react";
import {
	Container,
	Col,
	Form,
	Button,
	Card,
	Row
} from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVED_BOOK, SAVED_SHOW } from "../utils/mutations";
import { searchGoogleBooks, searchTMDB } from "../utils/API";
import {
	getReadBookIds,
	saveWatchedShowIds,
	getWatchedShowIds,
} from "../utils/localStorage";
import { saveReadBookIds } from "../utils/localStorage";
import noImageFound from "../assets/images/no-image-found.png";

// This function searches the books via the Google Book API

export const SearchBooks = () => {
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [saveBookMutation] = useMutation(SAVED_BOOK);
	const [readBookIds, setReadBookIds] = useState(getReadBookIds());
	const [searchError, setSearchError] = useState(false);

	useEffect(() => {
		return () => {
			const bookIds = getReadBookIds();
			saveReadBookIds(bookIds);
		};
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchGoogleBooks(searchInput);

			console.log(response.ok);

			if (!response.ok) {
				throw new Error("something went wrong");
			}

			const { items } = await response.json();

			if (!items || items.length === 0) {
				setSearchError(true);

				setSearchedBooks([]);
			} else {
				setSearchError(false);

				const bookData = items.map((book) => ({
					bookId: book.id,
					authors: book.volumeInfo.authors || ["No author to display"],
					title: book.volumeInfo.title,
					description: book.volumeInfo.description || "No description provided",
					image: book.volumeInfo.imageLinks?.thumbnail || noImageFound,
				}));

				setSearchedBooks(bookData);
				console.log(bookData);
			}

			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	// This function saves books to local storage and the database.

	const handleSaveBook = async (bookId) => {
		const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
		console.log(bookToSave);
		console.log(typeof bookId);
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await saveBookMutation({
				variables: { bookData: { ...bookToSave } },
			});

			setReadBookIds([...readBookIds, bookToSave.bookId]);
			saveReadBookIds([...readBookIds, bookToSave.bookId]);

			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="text-light bg- p-5">
				<p className="search-title">Add to your Records!</p>
				<Container className="search-container">
					<Form onSubmit={handleFormSubmit}>
						<Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="xlg"
									placeholder="Search for a book"
								/>
							</Col>

							<Col xs={12} md={4}>
								<Button
									className="submit-btn"
									type="submit"
									variant="success"
									size="lg"
								>
									Search
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>

			<Container>
				<h2 className="pt-5">
					{searchedBooks.length
						? `Viewing ${searchedBooks.length} results:`
						: searchError
						? "No books were found"
						: "Search for a book to begin"}
				</h2>
				<Row>
					{searchedBooks.map((book) => {
						return (
							<Col md="4" style={{ padding: "20px" }}>
								
								<Card key={book.bookId} border="dark" className="h-100 show-box">
									{book.image ? (
										<Card.Img
											src={book.image}
											alt={`The cover for ${book.title}`}
											variant="top"
											style={{objectFit: 'contain', maxHeight: "200px"}}
										/>
									) : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className="small">Authors: {book.authors}</p>
										<Card.Text style={{ maxHeight: "75px", overflowY: "auto" }}>
											{book.description}
										</Card.Text>
										{Auth.loggedIn() && (
											<Button
												disabled={readBookIds?.some(
													(savedBookId) => savedBookId === book.bookId
												)}
												className="btn-block btn-info join-btn"
												onClick={() => handleSaveBook(book.bookId)}
											>
												{readBookIds?.some(
													(savedBookId) => savedBookId === book.bookId
												)
													? "This book has been saved!"
													: "Save this Book!"}
											</Button>
										)}
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

// This function searches for tv shows via the TMDB API
export const SearchShows = () => {
	const [searchedShows, setSearchedShows] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [saveShowMutation] = useMutation(SAVED_SHOW);
	const [watchedShowIds, setWatchedShowIds] = useState(getWatchedShowIds());
	const [searchError, setSearchError] = useState(false);

	useEffect(() => {
		return () => {
			const tvShowIds = getWatchedShowIds();
			saveWatchedShowIds(tvShowIds);
		};
	}, []);

	const handleFormSubmitTV = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchTMDB(searchInput);

			if (response.status < 200 || response.status > 299) {
				throw new Error("something went wrong");
			}

			const showData = response.results.map((show) => ({
				tvShowsId: show.id.toString(),
				name: show.name,
				overview: show.overview || "No overview available",
				poster: show.poster_path
					? "https://image.tmdb.org/t/p/original" + show.poster_path
					: noImageFound,
			}));

			setSearchedShows([]);

			if (showData.length === 0) {
				setSearchError(true);
			} else {
				setSearchError(false);
				setSearchedShows(showData);
			}

			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	// This function saves a tv show to local storage and the database.
	const handleSaveShow = async (tvShowsId) => {
		const showToSave = searchedShows.find(
			(show) => show.tvShowsId === tvShowsId
		);
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}
		try {
			const stringTvShowsId = tvShowsId.toString();
			const { data } = await saveShowMutation({
				variables: {
					TvShowsData: {
						name: showToSave.name,
						overview: showToSave.overview,
						poster: showToSave.poster,
						tvShowsId: showToSave.tvShowsId,
					},
				},
			});

			setWatchedShowIds([...watchedShowIds, stringTvShowsId]);
			saveWatchedShowIds([...watchedShowIds, stringTvShowsId]);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="text-light bg-#06F283  p-5">
				<p className="search-title">Add to your Records!</p>
				<Container>
					<Form onSubmit={handleFormSubmitTV}>
						<Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="xlg"
									placeholder="Search for a TV show"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button
									className="submit-btn"
									type="submit"
									variant="success"
									size="lg"

								>
									Search
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>

			<Container>
				<h2 className="pt-5">
					{searchedShows.length
						? `Viewing ${searchedShows.length} results:`
						: searchError
						? "No TV shows were found"
						: "Search for a TV show to begin"}
				</h2>
				<Row>
					{searchedShows.map((show) => {
						return (
							<Col md="4" style={{ padding: "20px" }}>
								<Card
								 className="h-100 show-box"
									key={show.id}
									border="dark"
								>
									{show.poster ? (
										<Card.Img
											src={show.poster}
											alt={`The cover for ${show.name}`}
											variant="top"
											style={{objectFit: 'contain', maxHeight: "200px"}}
										/>
									) : null}
									<Card.Body>
										<Card.Title>{show.name}</Card.Title>
										<Card.Text style={{ maxHeight: "75px", overflowY: "auto" }}>
											{show.overview}
										</Card.Text>
										{Auth.loggedIn() && (
											<Button
												disabled={watchedShowIds?.some(
													(savedShowId) => savedShowId === show.tvShowsId
												)}
												className="btn-block btn-info join-btn"
												onClick={() => handleSaveShow(show.tvShowsId)}
											>
												{watchedShowIds?.some(
													(savedShowId) => savedShowId === show.tvShowsId
												)
													? "This show has already been saved!"
													: "Save this Show!"}
											</Button>
										)}
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
