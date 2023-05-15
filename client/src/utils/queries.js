import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
    me {
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
            tvShowsId
        }
        savedFriends {
            username
        }
    }
}
`;

export const QUERY_USERS = gql`
query Users {
    users {
        username
        savedBooks {
            title
        }
        savedTvShows {
            name
        }
        savedFriends {
        username
        }
    }
}
`