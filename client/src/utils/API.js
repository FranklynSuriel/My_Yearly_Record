
const getAPIKey = async () => {
  const response = await fetch('/api/environment');
  const data = await response.json();
  return data;
}

export const searchTMDB = async (query) => {
  try {
    const apiKey = await getAPIKey();
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false`)
    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Search to TMDB API failed')
  }
};
  
  
export const searchGoogleBooks = (query) => {
	return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
