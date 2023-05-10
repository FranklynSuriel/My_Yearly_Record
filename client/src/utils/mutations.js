import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username   
        }
    }
}
`;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username 
        }
    }
}
`;

export const SAVED_BOOK = gql`
mutation SavedBooks($bookData: BookInput!) {
    savedBooks(bookData: $bookData) {
        savedBooks {
            authors
            bookId
            bookStatus
            description
            image
            title 
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
            bookStatus
            description
            image
            title
        }
    }
}
`;
export const SAVED_SHOW = gql`
mutation SavedTvShows($tvShowsData: TvShowInput!) {
    savedTvShows(TvShowsData: $tvShowsData) {
        savedTvShows {
            name
            overview
            poster
            tvShowsId
            tvShowsStatus
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

export const GET_ALL_USERS = gql`
mutation GetAllUsers {
    getAllUsers {
        _id
        email
        username
        savedBooks {
            bookId
            title
            bookComments {
                _id
                comments
            }
        }
        savedFriends {
            _id
            username
        }
        savedTvShows {
            tvShowsId
            name
            tvShowsComments {
            _id
            comments
            }
        }
    }
}
`;

export const ADD_FRIEND = gql`
mutation AddFriend($friend: FriendInput!) {
    addFriend(Friend: $friend) {
        username
        savedFriends {
            username
        }
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation RemoveFriends($friend: FriendInput!) {
    removeFriends(Friend: $friend) {
        savedFriends {
        username
        }
    }
}
`;

