const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // working
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = User.findOne({ _id: context.user._id })
                return foundUser;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find();
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
        getAllUsers: async (parent, args, context) => {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                console.log(err);
                throw new Error('Failed to fetch users');
            }
        },
        // working
        savedBooks: async (parent, { bookData }, context) => {
            console.log(bookData)
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { savedBooks: bookData } },
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
        removeBook: async (parent, { bookId }, context) => {
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
        savedTvShows: async (parent, { TvShowsData }, context) => {
            console.log(TvShowsData)
            if (context.user) {
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { savedTvShows: TvShowsData } },
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
        addFriend: async (parents, { friend }, context) => {
            console.log(friend)
            if (context.user) {
                console.log("inside if")
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { savedFriends: friend } },
                        { new: true, runValidators: true }
                    );
                    console.log(updateUser)
                    return updateUser
                } catch (error) {
                    console.log(error)
                }
            }
        },
        removeFriends: async (parent, { friend }, context) => {
            if (context.user) {
                console.log("inside if")
                try {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedFriends: friend } },
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