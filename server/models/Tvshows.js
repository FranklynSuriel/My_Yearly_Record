const { Schema } = require('mongoose');

const tvshowsSchema = new Schema({
    authors: [
        {
            type: String,
        },
    ],
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
    // saved book id from tvShows API
    tvshowsId: {
        type: String,
        required: true,
    },
});

module.exports = tvshowsSchema;
