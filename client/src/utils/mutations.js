import { gql } from '@apollo/client';

export const addUser = gql`
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


export const login = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user {
        email
        password
        }
    }
}
`;

export const savedBook = gql`
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