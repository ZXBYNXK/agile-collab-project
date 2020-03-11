const mongoose = require('mongoose');

const graduateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Graduate', graduateSchema);