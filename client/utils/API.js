export const searchTMDB = (query) => {
    return fetch (`https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}&query=${query}&include_adult=false`)
}