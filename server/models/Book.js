const { Schema } = require('mongoose');
const commentsSchema = require('./Comments');
// const Comments = require('./Comments');

// This is a subDocument schema, it won't become its own model but we'll use it as the schema for the User's `bookList` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bookStatus: {
    type: String,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  bookComments: [commentsSchema]
});

module.exports = bookSchema;

// const { Schema, model } = require('mongoose');

// // This is a subDocument schema, it won't become its own model but we'll use it as the schema for the User's `bookList` array in User.js
// const bookSchema = new Schema({
//   authors: [
//     {
//       type: String,
//     },
//   ],
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   bookStatus: {
//     type: String,
//   },
//   // saved book id from GoogleBooks
//   bookId: {
//     type: String,
//     required: true,
//   },
//   bookComments: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Comments'
//     },
//   ],
  
// });

// const Book = model('Book', bookSchema);

// module.exports = Book;
