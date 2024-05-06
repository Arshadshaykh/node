const mongoose = require('mongoose');
const bcript = require('bcryptjs');
const validator = require('validator')
const Jwt = require('jsonwebtoken')

const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'please provide a valid Email'],
    },
    photo: { type: String },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 6,
        select: false,
    },
    passwordConfirm: {
        type: String,
        // required: [true, 'Please confirm password'],
    },
});
userSchema.pre('save', async function (next) {
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password, salt);
});


// match password with hashed password 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcript.compare(enteredPassword, this.password);
}
userSchema.methods.getSignedJwtToken = function () {
    return Jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}


module.exports = mongoose.model('User', userSchema)