const { Schema } = require('mongoose');

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

module.exports = tvShowsSchema;
