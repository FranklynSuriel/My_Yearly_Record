//  require necessary packages and modules
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// create the different resolvers for each query or mutation
const resolvers = {
	// create the queries "users" and "me" to ge the data to display
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const foundUser = User.findOne({ _id: context.user._id });
				return foundUser;
			}
			throw new AuthenticationError("Not logged in");
		},
		users: async () => {
			return User.find();
		},
	},

	// create the mutations to modify data
	Mutation: {
		// resolver to create a user on the database and return a token for authentication and an user object
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });

			const token = signToken(user);
			return { token, user };
		},
		// resolver to login a user, find the user but the email, return a token and user object
		login: async (parent, { email, password }) => {
			const user = await User.findOne({
				$or: [{ username: email }, { email }],
			});

			if (!user) {
				throw new AuthenticationError("Can't find this user");
			}
			// check for password authentication
			const correctPwd = await user.isCorrectPassword(password);

			if (!correctPwd) {
				throw new AuthenticationError("Wrong username or password!");
			}
			const token = signToken(user);
			return { token, user };
		},
		// resolver to return a list of all users
		getAllUsers: async (parent, args, context) => {
			try {
				const users = await User.find();
				return users;
			} catch (err) {
				console.log(err);
				throw new Error("Failed to fetch users");
			}
		},
		// resolver to save a book to the user savedBook list
		savedBooks: async (parent, { bookData }, context) => {
			console.log(bookData);
			if (context.user) {
				try {
					const updateUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $push: { savedBooks: bookData } },
						{ new: true, runValidators: true }
					);
					console.log(updateUser);
					return updateUser;
				} catch (error) {
					console.log(error);
				}
			}
		},
		// resolver to remove a book from the user savedBook list
		removeBook: async (parent, { bookId }, context) => {
			console.log(bookId);
			if (context.user) {
				try {
					const updatedUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $pull: { savedBooks: { bookId: bookId } } },
						{ new: true }
					);
					console.log(updatedUser);
					return updatedUser;
				} catch (error) {
					console.log(error);
				}
			}
		},
		// resolver to save a tv show to a user savedTvShow list
		savedTvShows: async (parent, { TvShowsData }, context) => {
			console.log(TvShowsData);
			if (context.user) {
				try {
					const updateUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $push: { savedTvShows: TvShowsData } },
						{ new: true, runValidators: true }
					);
					console.log(updateUser);
					return updateUser;
				} catch (error) {
					console.log(error);
				}
			}
		},
		// resolver to delete a tv show from the user savedTvShow list
		removeTvShows: async (parents, { tvShowsId }, context) => {
			console.log(tvShowsId);
			if (context.user) {
				try {
					const updatedUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $pull: { savedTvShows: { tvShowsId: tvShowsId } } },
						{ new: true }
					);
					console.log(updatedUser);
					return updatedUser;
				} catch (error) {
					console.log(error);
				}
			}
			// throw new AuthenticationError("You need to be logged in!");
		},

		// Future Development: any user can see your book list and make a comment

		// bookCommentsCreate: async (parents, { comments, bookId }, context) => {
		// 	if (!context.user) {
		// 		throw new Error("User not authenticated");
		// 	}

		// 	const userId = context.user._id;

		// 	try {
		// 		const updateUser = await User.findOneAndUpdate(
		// 			{
		// 				_id: userId,
		// 				"savedBooks.bookId": bookId,
		// 			},
		// 			{
		// 				$push: {
		// 					"savedBooks.$[book].bookComments": {
		// 						comments,
		// 						userId: context.user._id,
		// 					},
		// 				},
		// 			},
		// 			{
		// 				new: true,
		// 				runValidators: true,
		// 				arrayFilters: [{ "book.bookId": bookId }],
		// 			}
		// 		);
		// 		console.log(updateUser);
		// 		return updateUser;
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// },

		// Future Development: The user that created the comment can erase his comments from the book list

		// removeBookComment: async (parents, { bookId, _id }, context) => {
		// 	if (context.user) {
		// 		try {
		// 			const updateUser = await User.findOneAndUpdate(
		// 				{
		// 					_id: context.user._id,
		// 					"savedBooks.bookId": bookId,
		// 				},
		// 				{
		// 					$pull: { "savedBooks.$.bookComments": { _id } },
		// 				},
		// 				{ new: true }
		// 			);
		// 			console.log(updateUser);
		// 			return updateUser;
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	}
		// },

		// resolver to add a friend to the user savedFriend
		addFriend: async (parents, { friend }, context) => {
			console.log(friend);
			if (context.user) {
				console.log("inside if");
				try {
					const updateUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $push: { savedFriends: friend } },
						{ new: true, runValidators: true }
					);
					console.log(updateUser);
					return updateUser;
				} catch (error) {
					console.log(error);
				}
			}
		},
		// resolver to erase a friend fron the user savedFriend list
		removeFriends: async (parent, { friend }, context) => {
			if (context.user) {
				console.log("inside if");
				try {
					const updateUser = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $pull: { savedFriends: friend } },
						{ new: true, runValidators: true }
					);
					console.log(updateUser);
					return updateUser;
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
// export module
module.exports = resolvers;
