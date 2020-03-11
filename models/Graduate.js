const mongoose = require('mongoose');

const graduateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profession:{
        type: String,
        default: 'none'
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Graduate', graduateSchema);
