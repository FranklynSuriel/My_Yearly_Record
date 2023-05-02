const { Schema } = require('mongoose');

const friendsSchema = new Schema({
    username:[
        {
            type: String
        },
    ],
    userId: {
        type: String,
        require: true,
    }
});

module.exports = friendsSchema;