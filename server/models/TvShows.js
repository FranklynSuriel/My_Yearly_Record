const { Schema } = require('mongoose');

// create tv show schema
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
    author:[
        {
            type: String,
        },        
    ],
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
