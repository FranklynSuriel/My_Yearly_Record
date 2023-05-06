const { Schema } = require('mongoose');

const commentsSchema = new Schema({
    comments: [
        {
            type: String
        },
    ],
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],    
});

module.exports = commentsSchema;