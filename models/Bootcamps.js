const mongoose = require('mongoose');
const { Schema } = mongoose;

const BootcampSchema = Schema({
    name: { type: String, },
    slug: { type: String },
    description: {type: String,},
    email: {type: String,},
    phone: {type: String,},
    createdAt: {
        type: Date,
        default: Date.now
    },
    address: { type: String, },
});

module.exports = mongoose.model('Bootcamp', BootcampSchema)