import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        user {
        username
        email
        password      
        }
    }
}
`;


export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user {
        email
        password
        }
    }
}
`;

export const SAVED_BOOK = gql`
mutation SavedBook($bookData: BookInput!) {
    savedBook(bookData: $bookData) {
        savedBooks {
        authors
        bookId
        description
        image
        title
        bookStatus
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookData: BookInput!) {
    removeBook(bookData: $bookData) {
        removeBooks {
            authors
            bookId
            description
            image
            title
            bookStatus
        }
    }
}
`;
export const SAVED_SHOW = gql`
mutation SavedShow($showData: ShowInput!) {
    savedShow(showData: $showData) {
        savedShows {
        name
        overview
        poster
        tvShowsId
        tvShowStatus
        }
    }
}
`;

export const REMOVE_SHOW = gql`
mutation RemoveShow($showData: ShowInput!) {
    savedShow(showData: $showData) {
        savedShows {
        name
        overview
        poster
        tvShowsId
        tvShowStatus

 
        }
    }
}
`;