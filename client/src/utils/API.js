const API_KEY = process.env.API_KEY;

export const searchTMDB = (query) => {
	return fetch(
		`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}&include_adult=false`
	);
};

export const searchGoogleBooks = (query) => {
	return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
