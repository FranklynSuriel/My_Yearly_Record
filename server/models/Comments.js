const { Schema } = require('mongoose');

const commentsSchema = new Schema({
    comments:[
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