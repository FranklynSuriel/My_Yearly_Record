const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        friend(friendId: ID): Friends
    }
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Books]!
        savedTvShows: [TvShows]!
        savedFriends: [Friends]
    }

    type Books {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
        bookComments: [Comments]        
    }

    input BookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type TvShows {
        name: String
        overview: String
        poster: String
        tvShowsId: String
        tvShowsComments: [Comments]
    }

    input TvShowInput {
        tvShowsId: String
        name: String
        overview: String
        poster: String
    }

    type Comments {
        comments: [String]
        userId: String
        commentsId: String
    }
    
    type Friends {
        username: [String]
        userId: String
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        savedBook(bookData: BookInput!): User
        removeBook(bookId: String!): User

        savedTvShows(TvShowsData: TvShowInput!): User
        removeTvShows(tvShowsId: String!): User

        addComments( comments: String!, userId: String!): User
        removeComments(commentsId: String!): User

        addFriends( username: String!): User
        removeFriends(friendId: ID!): User
    }
`;

module.exports = typeDefs;