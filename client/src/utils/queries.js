import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
    me {
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