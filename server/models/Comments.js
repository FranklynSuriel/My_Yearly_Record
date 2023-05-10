const { Schema } = require('mongoose');

const commentsSchema = new Schema({
    comments: [
        {
            type: String,
            required: true 
        },
    ],
    // userId: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User',
    //         require: true
    //     },
    // ],    
});

module.exports = commentsSchema;