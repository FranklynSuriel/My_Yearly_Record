import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
        me {
            _id
            username
            email
            bookCount
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