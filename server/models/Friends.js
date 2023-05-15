const { Schema } = require('mongoose');

// This is a subDocument schema, it won't become its own model but we'll use it as the schema for the User's `SavedFriendList` array in User.js
const friendsSchema = new Schema({
    username:
        {
            type: String
        },
    
});

module.exports = friendsSchema;