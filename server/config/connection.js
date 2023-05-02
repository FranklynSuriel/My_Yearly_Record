const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yearlyrecord');

module.exports = mongoose.connection;
