/**
 * Created by rdrutt on 2/9/17.
 */
var mongoose = require('mongoose');
function connect () {
    mongoose.connect('mongodb://localhost/test');
}
module.exports = connect;

