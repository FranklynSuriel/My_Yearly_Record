
const getAPIKey = async () => {
  const response = await fetch('/api/environment');
  const data = await response.json();
  return data;
}

export const searchTMDB = (query) => {
  return getAPIKey()
    .then(apiKey => {
      return fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(error => {
          console.error(error);
          throw new Error('Search to TMDB API failed');
        });
    });
};


export const searchGoogleBooks = (query) => {
	return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
