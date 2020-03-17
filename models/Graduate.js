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
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 9000
    },
    profession:{
        type: String,
        default: 'none'
    },
    company: {
        type: String,
        default: 'Available for work'
    },
    graduationDate: {
        type: String,
        default: "undergraduate"
    },
    skills: {    
        type: String,
        maxlength: 1000,
        default: 'N/A'
    },
    linkedIn: {
        type: String,
        maxlength: 9000
    },
    twitter: { 
        type: String,
        maxlength: 9000
    }

});

module.exports = mongoose.model('Graduate', graduateSchema);
