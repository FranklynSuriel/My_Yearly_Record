import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me{
        me {
            _id
            username
            email
            password
            savedBook {
                bookId
                authors
                description
                title
                image
                link
                bookComments {
                    comments
                    userId
                    commentsId
                }
            }
            savedTvShows {
                name
                overview
                poster
                tvShowsId
                tvShowsComments{
                    comments
                    userId
                    commentsId
                }
            }
            savedFriends{
            username
            userId
            }
        }
    }
`;

export const QUERY_USERS = gql`
query Users {
    users {
        username
        email
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