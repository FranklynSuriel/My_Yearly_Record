// import React, { useState, useEffect } from "react";
// import { Container, Col, Form, Button, Card, Row, Dropdown, DropdownButton } from "react-bootstrap";
// import Auth from "../utils/auth";
// import { Navigate } from 'react-router-dom';
// import { useMutation } from "@apollo/client";
// import { SAVED_BOOK, SAVED_SHOW } from "../utils/mutations";
// import { searchGoogleBooks, searchTMDB } from "../utils/API";
// import {
// 	// getReadBookIds,
// 	saveWatchedShowIds,
// 	getWatchedShowIds,
// } from "../utils/localStorage";
// // import { saveReadBookIds } from "../utils/localStorage";

// export const SearchShows = () => {
// 	const [searchedShows, setSearchedShows] = useState([]);
// 	const [searchInput, setSearchInput] = useState("");
// 	const [saveShowMutation] = useMutation(SAVED_SHOW);
// 	const [watchedShowIds, setWatchedShowIds] = useState(getWatchedShowIds());

// 	useEffect(() => {
// 		return () => {
// 			const showIds = getWatchedShowIds();
// 			saveWatchedShowIds(showIds);
// 		};
// 	}, []);

// 	const handleFormSubmitTV = async (event) => {
// 		event.preventDefault();

// 		if (!searchInput) {
// 			return false;
// 		}

// 		try {
// 			const response = await searchTMDB(searchInput);
// 			console.log(searchInput);
// 			console.log(response);


// 			if (response.status < 200 || response.status > 299) {
// 				throw new Error("something went wrong");
// 			}

// 			console.log(response);
// 			console.log(typeof response);

// 			const showData = response.results.map((show) => ({
// 				tvShowsId: show.id,
// 				name: show.name,
// 				overview: show.overview,
// 				poster: show.poster_path || "",
// 			}));
// 			console.log(showData);

// 			setSearchedShows(showData);
// 			setSearchInput("");
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};

// 	const handleSaveShow = async (tvShowsId) => {
// 		console.log(searchedShows)
// 		console.log(tvShowsId)
// 		const showToSave = searchedShows.find((show) => show.showId === tvShowsId);
// 		console.log(showToSave)

// 		const token = Auth.loggedIn() ? Auth.getToken() : null;

// 		console.log(token)

// 		if (!token) {
// 			return false;
// 		}

// 		try {
// 			const {data} = await saveShowMutation({
// 				variables: { showData: { ...showToSave } },
// 			});

// 			setWatchedShowIds([...watchedShowIds, showToSave.tvShowsId]);
// 			saveWatchedShowIds([...watchedShowIds, showToSave.tvShowsId])

// 			console.log(setWatchedShowIds);

// 			console.log(data);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="text-light bg-#06F283  p-5">
// 				<Container>
// 					<h1>Search for TV Shows!</h1>
// 					<Form onSubmit={handleFormSubmitTV}>
// 						<Row>
// 							<Col xs={12} md={8}>
// 								<Form.Control
// 									name="searchInput"
// 									value={searchInput}
// 									onChange={(e) => setSearchInput(e.target.value)}
// 									type="text"
// 									size="md"
// 									placeholder="Search for a tv show"
// 								/>
// 							</Col>
// 							<Col xs={12} md={4}>
// 								<Button
// 									type="submit"
// 									variant="success"
// 									size="lg"
// 									style={{ backgroundColor: "p#06F283" }}
// 								>
// 									Submit Search
// 								</Button>
// 							</Col>
// 						</Row>
// 					</Form>
// 				</Container>
// 			</div>

// 			<Container>
// 				<h2 className="pt-5">
// 					{searchedShows.length
// 						? `Viewing ${searchedShows.length} results:`
// 						: "Search for a tv show to begin"}
// 				</h2>
// 				<Row>
// 					{searchedShows.map((show) => {
// 						return (
// 							<Col md="4" style={{ padding: "20px" }}>
// 								<Card key={show.id} border="dark" style={{ backgroundColor: "#F29506" }}>
// 									{show.poster ? (
// 										<Card.Img
// 											src={`https://image.tmdb.org/t/p/original/${show.poster}`}
// 											alt={`The cover for ${show.name}`}
// 											variant="top"
// 											style={{ height: "325px" }}
// 										/>
// 									) : null}
// 									<Card.Body>
// 										<Card.Title >{show.name}</Card.Title>
// 										<Card.Text style={{ maxHeight: "75px", overflowY: "auto" }}>{show.overview}</Card.Text>
// 										{Auth.loggedIn() && (
// 											<Button
// 												disabled={watchedShowIds?.some(
// 													(savedShowId) => savedShowId === show.showId
// 												)}
// 												className="btn-block btn-info join-btn"
// 												onClick={() => handleSaveShow(show.showId)}
// 											>
// 												{watchedShowIds?.some(
// 													(savedShowId) => savedShowId === show.showId
// 												)
// 													? "This show has already been saved!"
// 													: "Save this Show!"}
// 											</Button>
// 										)}
// 									</Card.Body>
// 								</Card>
// 							</Col>
// 						);
// 					})}
// 				</Row>
// 			</Container>
// 		</>
// 	);
// };

// // function Search() {
// // 	return <p>This is the Search Page!</p>;
// // }

// // export default SearchShows;