var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    dateJoined: { type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;