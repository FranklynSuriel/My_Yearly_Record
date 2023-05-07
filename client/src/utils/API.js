// import {API_KEY} from '../../../server/config/config';

const API_KEY = process.env.API_KEY;

export const searchTMDB = (query) => {
	console.log(API_KEY)
	return fetch(
		`https://api.themoviedb.org/3/search/tv?api_key=32ce25589aa56c85a8438a669253213c&query=${query}&include_adult=false`
	)
	.then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
      throw new Error('Search to TMDB API failed')
    });
};

// export const searchTMDB = async (query) => {
// 	// const apiKeyResponse = await fetch('/api/get-key');
// 	// const {apiKey} = await apiKeyResponse.json();

// 	try {
// 		const searchResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=32ce25589aa56c85a8438a669253213c&query=${query}&include_adult=false`)
// 	const searchData = await searchResponse.json();
// 	return searchData;
// 	} catch(err){
// 		console.error(err);
// 		throw new Error('Search to TMDB API failed')
// 	}
// }

export const searchGoogleBooks = (query) => {
	return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
