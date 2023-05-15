export const getReadBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_read_books');

    console.log(savedBookIds)
  
    if (!savedBookIds) {
      console.log('No saved_read_books item in localStorage');
      return [];
    }
  
    try {
      const parsedBookIds = JSON.parse(savedBookIds);
      console.log('Parsed saved_read_books item:', parsedBookIds);
      return parsedBookIds;
    } catch (err) {
      console.log('Error parsing saved_read_books item:', err);
      return [];
    }
  };
  

export const saveReadBookIds = (bookIdArr) => {
    console.log(bookIdArr)
    if (bookIdArr.length) {
        localStorage.setItem('saved_read_books', JSON.stringify(bookIdArr))
    }
}

export const removeReadBookIds = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_read_books')
    ? JSON.parse(localStorage.getItem('saved_read_books'))
    : null;

    if (!savedBookIds) {
        return false;
    }

    const updatedSavedBookIds = savedBookIds?.filter((savedBookId)=> savedBookId !== bookId);
    localStorage.setItem('saved_read_books', JSON.stringify(updatedSavedBookIds))

    return true;
};

export const getWatchedShowIds = () => {
    const savedShowIds = localStorage.getItem('saved_watched_shows');

    console.log(savedShowIds)
  
    if (!savedShowIds) {
      console.log('No saved_watched_shows item in localStorage');
      return [];
    }
  
    try {
      const parsedShowIds = JSON.parse(savedShowIds);
      console.log('Parsed saved_watched_shows item:', parsedShowIds);
      return parsedShowIds;
    } catch (err) {
      console.log('Error parsing saved_watched_shows item:', err);
      return [];
    }
  };

export const saveWatchedShowIds = (showIdArr) => {
    console.log(showIdArr)
    if (showIdArr.length) {
        localStorage.setItem('saved_watched_shows', JSON.stringify(showIdArr))
    }
}


export const removeWatchedShowIds = (showId) => {
    const savedShowIds = localStorage.getItem('saved_watched_shows')
    ? JSON.parse(localStorage.getItem('saved_watched_shows'))
    : null;

    if (!savedShowIds) {
        return false;
    }

    const updatedSavedShowIds = savedShowIds?.filter((savedShowId)=> savedShowId !== showId);
    localStorage.setItem('saved_watched_shows', JSON.stringify(updatedSavedShowIds))

    return true;
};


