export const getReadBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_read_books')
    ? JSON.parse(localStorage.getItem('saved_read_books'))
    : [];

    return savedBookIds
}

export const saveReadBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
        localStorage.setItem('saved_read_books', JSON.stringify(bookIdArr))
    }
}

export const removeReadBookIds = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

    if (!savedBookIds) {
        return false;
    }

    const updatedSavedBookIds = savedBookIds?.filter((savedBookId)=> savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds))

    return true;
};

// export const getWantToReadBookIds = () => {
//     const savedBookIds = localStorage.getItem('saved_want_to_read_books')
//     ? JSON.parse(localStorage.getItem('saved_want_to_read_books'))
//     : []

//     return savedBookIds
// }

// export const saveWantToReadBookIds = (bookIdArr) => {
//     if (bookIdArr.length) {
//         localStorage.setItem('saved_want_to_read_books', JSON.stringify(bookIdArr))
//     }
// }

// export const removeWantToReadBookIds = (bookId) => {
//     const savedBookIds = localStorage.getItem('saved_want_to_read_books')
//     ? JSON.parse(localStorage.getItem('saved_want_to_read_books'))
//     : null;

//     if (!savedBookIds) {
//         return false;
//     }

//     const updatedSavedBookIds = savedBookIds?.filter((savedBookId)=> savedBookId !== bookId);
//     localStorage.setItem('saved_want_to_read_books', JSON.stringify(updatedSavedBookIds))

//     return true;
// };

export const getWatchedShowIds = () => {
    const savedShowIds = localStorage.getItem('saved_watched_shows')
    ? JSON.parse(localStorage.getItem('saved_watched_shows'))
    : [];

    return savedShowIds
}

export const saveWatchedShowIds = (showIdArr) => {
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

// export const getWantToWatchShowIds = () => {
//     const savedShowIds = localStorage.getItem('saved_want_to_watch_shows')
//     ? JSON.parse(localStorage.getItem('saved_want_to_watch_shows'))
//     : []

//     return savedShowIds
// }

// export const saveWantToWatchShowIds = (showIdArr) => {
//     if (showIdArr.length) {
//         localStorage.setItem('saved_want_to_watch_shows', JSON.stringify(showIdArr))
//     }
// }

// export const removeWantToWatchShowIds = (showId) => {
//     const savedShowIds = localStorage.getItem('saved_want_to_watch_shows')
//     ? JSON.parse(localStorage.getItem('saved_want_to_watch_shows'))
//     : null;

//     if (!savedShowIds) {
//         return false;
//     }

//     const updatedSavedShowIds = savedShowIds?.filter((savedShowId)=> savedShowId !== showId);
//     localStorage.setItem('saved_want_to_watch_shows', JSON.stringify(updatedSavedShowIds))

//     return true;
// };

