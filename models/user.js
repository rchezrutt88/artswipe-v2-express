/**
 * Created by rdrutt on 2/13/17.
 */
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt')
    data = require('../data/users.json');

const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);