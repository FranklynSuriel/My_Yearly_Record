const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not logged in');
            }

            const foundUser = User.findOne({ _id: user.id }).populate('savedBooks');
            return foundUser;
        },
    },
    Mutation: {
        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ $or: [{ username: email }, { email }] });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { bookData }, { user }) => {
            if (!user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
            ).populate('savedBooks');

            return updatedUser;
        },
        removeBook: async (_, { bookId }, { user }) => {
            if (!user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');

            return updatedUser;
        },
    },
}

module.exports = resolvers;