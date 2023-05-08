const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // working
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = User.findOne({ _id: context.user._id })
                    .select('__v -password');
                return foundUser;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        // working
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            // const correctPwd = await user.isCorrectPassword(password);

            // if (!correctPwd) {
            //     throw new AuthenticationError('Wrong username or password!');
            // }
            
            const token = signToken(user);
            return { token, user };
        },
        // working
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ $or: [{ username: email }, { email }] });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPwd = await user.isCorrectPassword(password);

            if (!correctPwd) {
                throw new AuthenticationError('Wrong username or password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        // working
        savedBooks: async (parents, { bookData }, context) => {
            console.log(bookData)
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: bookData } },
                        { new: true, runValidators: true }
                    );
                    console.log(updateUser)
                    return updateUser
                } catch (error) {
                    console.log(error)
                }
            }
        },
        // working
        removeBook: async (parents, { bookId }, context) => {
            console.log(bookId)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                console.log(updatedUser)
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // working
        savedTvShows: async (parents, { TvShowsData }, context) => {
            console.log(TvShowsData)
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedTvShows: TvShowsData } },
                        { new: true, runValidators: true }
                    );
                    console.log(updateUser)
                    return updateUser
                } catch (error) {
                    console.log(error)
                }
            }
        },
        // working
        removeTvShows: async (parents, { tvShowsId }, context) => {
            console.log(tvShowsId)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedTvShows: { tvShowsId } } },
                    { new: true }
                );
                console.log(updatedUser)
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // working
        bookCommentsCreate: async (parents, { comments, bookId }, context) => {
            if (!context.user) {
                throw new Error('User not authenticated');
            }

            const userId = context.user._id;

            try {
                const updateUser = await User.findOneAndUpdate(
                    {
                        _id: userId,
                        "savedBooks.bookId": bookId
                    },
                    {
                        $push: { "savedBooks.$[book].bookComments": { comments, userId: context.user._id } }
                    },
                    {
                        new: true,
                        runValidators: true,
                        arrayFilters: [
                            { "book.bookId": bookId }
                        ]
                    }
                );
                console.log(updateUser)
                return updateUser
            } catch (error) {
                console.log(error)
            }

        },
        removeBookComment: async (parents, { bookId, _id }, context) => {
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        {
                            _id: context.user._id,
                            "savedBooks.bookId": bookId
                        },
                        {
                            $pull: { "savedBooks.$.bookComments": { _id } }
                        },
                        { new: true }
                    );
                    console.log(updateUser)
                    return updateUser;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        addFriend: async (parents, { Friend }, context) => {
            console.log(Friend)
            if (context.user) {
                console.log("inside if")
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedFriends: Friend } },
                        { new: true, runValidators: true }
                    );
                    console.log(updateUser)
                    return updateUser
                } catch (error) {
                    console.log(error)
                }
            }
        },
        removeFriends: async ( parent, { Friend }, context) => {
            if (context.user) {
                console.log("inside if")
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedFriends: Friend } },
                        { new: true, runValidators: true }
                    );
                    console.log(updateUser)
                    return updateUser
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

}
// removeBookComments: async (parents, { commentsId }, context) => {
//     console.log(commentsId)
//     if (context.user) {
//         const updatedUser = await User.findOneAndUpdate(
//             { _id: context.user._id },
//             { $pull: { removeBookComments: { commentsId } } },
//             { new: true }
//         );
//         console.log(updatedUser)
//         return updatedUser;
//     }
//     throw new AuthenticationError('You need to be logged in!');
// },



module.exports = resolvers;