const { Schema } = require('mongoose');

const commentsSchema = new Schema({
    comment:[
        {
            type: String
        },
    ],
    userId: {
        type: String,
        require: true,
    }
});

module.exports = commentsSchema;