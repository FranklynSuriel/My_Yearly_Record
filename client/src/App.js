import React from 'react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import Friend from './pages/Friend'
import Profile from './pages/Profile';
import { SearchShows } from './pages/Search';
import { SearchBooks } from './pages/Search';
import NavBar from './components/Navbar/Navbar';
import SearchLanding from './pages/SearchLanding';



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		// <div className='page-container'>
		// 	<div className="content-wrap">

		<ApolloProvider client={client}>
			<div className='page-container min-vh-100'>
				<div className="content-wrap">
					<Router>
						<div className="flex-column justify-flex-start ">
							<NavBar />
							<div className="container">
								<Routes>
									<Route
										path="/"
										element={<Landing />}
									/>
									<Route
										path="/login"
										element={<Login />}
									/>
									<Route
										path="/signup"
										element={<Signup />}
									/>
									<Route
										path="/profile"
										element={<Profile />}
									/>
									<Route
										path="/friends"
										element={<Friend />}
									/>
									<Route
										path="/search"
										element={<SearchLanding />}
									/>
									<Route
										path="/tvshows"
										element={<SearchShows />}
									/>
									<Route
										path="/books"
										element={<SearchBooks />}
									/>
									<Route
										path="*"
										element={<div>Not Found</div>}
									/>
								</Routes>
							</div>
							<Footer />
						</div>
					</Router>
				</div>
			</div>
		</ApolloProvider>

		// </div>
		// </div>
	);
}

export default App;
