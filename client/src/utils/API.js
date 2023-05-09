// import {API_KEY} from '../../../server/config/config';

const API_KEY = process.env.API_KEY;

export const searchTMDB = (query) => {
	console.log(API_KEY)
	return fetch(
		``
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


export const searchGoogleBooks = (query) => {
	return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
