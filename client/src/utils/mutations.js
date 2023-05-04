import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
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
        link
        title
        }
    }
}
`;