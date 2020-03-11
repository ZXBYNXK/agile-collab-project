const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    graduateName: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Article', articleSchema);