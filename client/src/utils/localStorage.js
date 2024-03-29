// Create a function to get the saved books id from the localStore
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

// Create a function to saved the books id to the localStore
export const saveReadBookIds = (bookIdArr) => {
    console.log(bookIdArr)
    if (bookIdArr.length) {
        localStorage.setItem('saved_read_books', JSON.stringify(bookIdArr))
    }
}

// Create a function to remove a book id from the local store 
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
// Create a function to get the saved tv shows id from the localStore
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

// Create a function to saved the tv shows id to the localStore
export const saveWatchedShowIds = (showIdArr) => {
    console.log(showIdArr)
    if (showIdArr.length) {
        localStorage.setItem('saved_watched_shows', JSON.stringify(showIdArr))
    }
}

// Create a function to remove a tv show id from the local store
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
// Future Development: Create a function to saved the friend list to the localStore
export const saveFriend = () => {
  const savedFriends = localStorage.getItem('saved_friends');

  console.log(savedFriends)

  if (!savedFriends) {
    console.log('No saved_friends item in localStorage');
    return [];
  }

  try {
    const parsedFriend = JSON.parse(savedFriends);
    console.log('Parsed saved_friends item:', parsedFriend);
    return parsedFriend;
  } catch (err) {
    console.log('Error parsing saved_friends item:', err);
    return [];
  }
};
