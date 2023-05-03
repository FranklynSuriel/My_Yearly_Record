const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:  {
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
        addUser: async(parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            
            //     throw new AuthenticationError("");
            // }

            const correctPwd = await user.isCorrectPassword(password);

            if (!correctPwd) {
                throw new AuthenticationError('Wrong username or password!');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;