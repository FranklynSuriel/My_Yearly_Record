import React, { useState, useEffect } from "react";
import {
	Container,
	Col,
	Form,
	Button,
	Card,
	Row,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVED_BOOK, SAVED_SHOW } from "../utils/mutations";
import { searchGoogleBooks, searchTMDB } from "../utils/API";
import {
	getReadBookIds,
	saveWatchedShowIds,
	getWatchedShowIds,
} from "../utils/localStorage";
import { saveReadBookIds } from "../utils/localStorage";

export const SearchBooks = () => {
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [saveBookMutation] = useMutation(SAVED_BOOK);
	const [readBookIds, setReadBookIds] = useState(getReadBookIds());

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

			const bookData = items.map((book) => ({
				bookId: book.id,
				authors: book.volumeInfo.authors || ["No author to display"],
				title: book.volumeInfo.title,
				description: book.volumeInfo.description || "No description provided",
				image: book.volumeInfo.imageLinks?.thumbnail || "",
			}));

			console.log(bookData);

			setSearchedBooks(bookData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleSaveBook = async (bookId) => {
		const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
		console.log(bookToSave);
		console.log(typeof bookId)
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
				{/* <Container className="search-container"> */}
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
									placeholder="Search"
								/>
								{/* <DropdownButton id="dropdown-basic-button" title="Choose a Category" className="dropdown-info">
									<Dropdown.Item>
									<Navigate to="/books" />Books</Dropdown.Item>
									<Dropdown.Item>
									<Navigate to="/tvshows" />TV Shows</Dropdown.Item>
								</DropdownButton> */}
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
						: "Search for a book to begin"}
				</h2>
				<Row>
					{searchedBooks.map((book) => {
						return (
							<Col md="4" style={{ padding: "20px" }}>
								<Card key={book.bookId} border="dark">
									{book.image ? (
										<Card.Img
											src={book.image}
											alt={`The cover for ${book.title}`}
											variant="top"
											style={{ height: "325px" }}
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
													? "This book has already been saved!"
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

export const SearchShows = () => {
	const [searchedShows, setSearchedShows] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		return () => {
			const showIds = getWatchedShowIds();
			saveWatchedShowIds(showIds);
		};
	}, []);

	const handleFormSubmitTV = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchTMDB(searchInput);
			console.log(searchInput);
			console.log(response);

			if (response.status < 200 || response.status > 299) {
				throw new Error("something went wrong");
			}

			console.log(response);
			console.log(typeof response);

			const showData = response.results.map((show) => ({
				tvShowsId: show.id,
				name: show.name,
				overview: show.overview,
				poster: show.poster_path || "",
			}));
			
			console.log(showData);

			setSearchedShows(showData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	const [saveShowMutation] = useMutation(SAVED_SHOW);
	const [watchedShowIds, setWatchedShowIds] = useState(getWatchedShowIds());
console.log(saveShowMutation)

	const handleSaveShow = async (tvShowsId) => {
		console.log(searchedShows);
		console.log(tvShowsId);
		console.log(typeof tvShowsId)
	
		const showToSave = searchedShows.find(
			(show) => show.tvShowsId === tvShowsId
		);
	
		console.log(showToSave);
	
		const token = Auth.loggedIn() ? Auth.getToken() : null;
	
		if (!token) {
			return false;
		}
	
		console.log("hello from before the try catch");
	const stringTvShowsId = tvShowsId.toString()
	console.log(typeof stringTvShowsId)
		const {data} = await saveShowMutation({
			variables: { tvShowsData: { ...showToSave.stringTvShowsId } },
		});
	
		if (data.errors) {
			console.error("Show not saved");
			return;
		}
	
		console.log("hello from inside the try catch");
	
		const updatedWatchedShowIds = [...watchedShowIds, showToSave.stringTvShowsId];
	
		setWatchedShowIds(updatedWatchedShowIds);
		saveWatchedShowIds(updatedWatchedShowIds);
	
		console.log(data);
	};

	return (
		<>
			<div className="text-light bg-#06F283  p-5">
				<Container>
					<h1>Search for TV Shows!</h1>
					<Form onSubmit={handleFormSubmitTV}>
						<Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="md"
									placeholder="Search for a tv show"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button
									type="submit"
									variant="success"
									size="lg"
									style={{ backgroundColor: "p#06F283" }}
								>
									Submit Search
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
						: "Search for a tv show to begin"}
				</h2>
				<Row>
					{searchedShows.map((show) => {
						return (
							<Col md="4" style={{ padding: "20px" }}>
								<Card
									key={show.id}
									border="dark"
									style={{ backgroundColor: "#F29506" }}
								>
									{show.poster ? (
										<Card.Img
											src={`https://image.tmdb.org/t/p/original/${show.poster}`}
											alt={`The cover for ${show.name}`}
											variant="top"
											style={{ height: "325px" }}
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
