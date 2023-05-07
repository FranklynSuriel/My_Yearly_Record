import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVED_BOOK, SAVED_SHOW } from "../utils/mutations";
import { searchGoogleBooks, searchTMDB} from "../utils/API";
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

	// useEffect(() => {
	// 	return () => saveReadBookIds(saveReadBookIds);
	// });

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

            console.log(response.ok)

			if (!response.ok) {
				throw new Error("something went wrong");
			}

			const { items } = await response.json();
            
			const bookData = items.map((book) => ({
				bookId: book.id,
				authors: book.volumeInfo.authors || ["No author to display"],
				title: book.volumeInfo.title,
				description: book.volumeInfo.description,
				image: book.volumeInfo.imageLinks?.thumbnail || "",
			}));

            console.log(bookData)

			setSearchedBooks(bookData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleSaveBook = async (bookId) => {
	    const bookToSave = searchedBooks.find((book)=> book.bookId === bookId)

	    const token = Auth.loggedIn() ? Auth.getToken() : null;

	    if (!token) {
	        return false;
	    }

	    try {
	        const {data} = await saveBookMutation({
	            variables: {bookData: {...bookToSave}},
	        })

	        setReadBookIds([...saveReadBookIds, bookToSave.bookId])
	        console.log(setReadBookIds)

	        console.log(data)
	    } catch (err) {
	        console.error(err)
	    }
	}

	return (
		<>
			<div className="text-light bg-info p-5">
				<Container>
					<h1>Search for Books!</h1>
					<Form onSubmit={handleFormSubmit}>
						<Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="lg"
									placeholder="Search for a book"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button
									type="submit"
									variant="success"
									size="lg"
									style={{ backgroundColor: "purple" }}
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
					{searchedBooks.length
						? `Viewing ${searchedBooks.length} results:`
						: "Search for a book to begin"}
				</h2>
				<Row>
					{searchedBooks.map((book) => {
						return (
							<Col md="3">
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
										<Card.Text style={{maxHeight: "75px", overflowY: "auto"}}>{book.description}</Card.Text>
										{Auth.loggedIn() && (
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
	const [saveShowMutation] = useMutation(SAVED_SHOW);
    
    const handleFormSubmitTV = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchTMDB(searchInput);
            console.log(searchInput)
            console.log(response)
            
            const data = await response.json();
            console.log(data.ok)

			if (!data.ok) {
				throw new Error("something went wrong");
			}

            console.log(response)

			// const { items } = await response.json();

			const showData = data.map((show) => ({
				tvShowsId: show.id,
				name: show.name,
				overview: show.overview,
				poster: show.poster || "",
			}));
            console.log(showData);
			setSearchedShows(showData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	// const handleSaveBook = async (bookId) => {
	//     const bookToSave = searchedBooks.find((book)=> book.bookId === bookId)

	//     // const token = Auth.loggedIn() ? Auth.getToken() : null;

	//     // if (!token) {
	//     //     return false;
	//     // }

	//     try {
	//         const {data} = await saveBookMutation({
	//             variables: {bookData: {...bookToSave}},
	//         })

	//         // setSavedBookIds([...savedBookIds, bookToSave.bookId])
	//         setSavedBookIds(prevSavedBookIds => [...prevSavedBookIds, bookToSave.bookId])
	//         console.log(setSavedBookIds)

	//         console.log(data)
	//     } catch (err) {
	//         console.error(err)
	//     }
	// }

	return (
		<>
			<div className="text-light bg-dark p-5">
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
									size="lg"
									placeholder="Search for a tv show"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button
									type="submit"
									variant="success"
									size="lg"
									style={{ backgroundColor: "purple" }}
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
							<Col md="4">
								<Card key={show.tvShowId} border="dark">
									{show.image ? (
										<Card.Img
											src={show.image}
											alt={`The cover for ${show.title}`}
											variant="top"
										/>
									) : null}
									<Card.Body>
										<Card.Title>{show.title}</Card.Title>
										<Card.Text>{show.description}</Card.Text>
										{/* {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedBookIds?.some(
                                                (savedBookId) => savedBookId === book.bookId
                                            )}
                                            className="btn-block btn-info"
                                            // onClick={() => handleSaveBook(book.bookId)}
                                        >
                                            {savedBookIds?.some(
                                                (savedBookId) => savedBookId === book.bookId
                                            )
                                                ? "This book has already been saved!"
                                                : "Save this Book!"}
                                        </Button>
                                    )} */}
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

// function Search() {
// 	return <p>This is the Search Page!</p>;
// }

// export default {
//     SearchBooks,
//     SearchShows,
// }
