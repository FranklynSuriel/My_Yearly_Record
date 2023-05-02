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

