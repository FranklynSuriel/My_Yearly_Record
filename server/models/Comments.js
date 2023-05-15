const { Schema } = require('mongoose');

// Future Development: able to create and delete comments to the book and tv show lists
const commentsSchema = new Schema({
    comments: [
        {
            type: String,
            required: true 
        },
    ], 
});

module.exports = commentsSchema;