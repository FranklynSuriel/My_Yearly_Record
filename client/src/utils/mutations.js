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
        _id
        username
        email
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
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        username
        savedBooks {
            bookId
            title
            image
            authors
            description
        }
        savedTvShows {
            name
            overview
            poster
        }
        savedFriends {
            username
        }
    }
}
`;
export const SAVED_SHOW = gql`
mutation SavedTvShows($TvShowsData: TvShowInput!) {
    savedTvShows(TvShowsData: $TvShowsData) {
        _id
        username
        email
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
mutation RemoveTvShows($tvShowsId: String!) {
    removeTvShows(tvShowsId: $tvShowsId) {
        username
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
    addFriend(friend: $friend) {
      username
      savedFriends {
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
mutation RemoveFriends($friend: FriendInput!) {
    removeFriends(friend: $friend) {
        savedFriends {
        username
        }
    }
}
`;

