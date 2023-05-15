const { Schema } = require('mongoose');

// // This is a subDocument schema, it won't become its own model but we'll use it as the schema for the User's `SavedTvShowList` array in User.js
const tvShowsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    tvShowsId: {
        type: String,
        required: true,
    },
    tvShowsStatus: {
        type: String,
    },
    tvShowsComments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        },
    ],
});

// export module tvShowSchema
module.exports = tvShowsSchema;
