/**
 * Created by rdrutt on 2/17/17.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*create schema*/
const artSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    artist: {
        type: String,
    },
    slug: {
        type: String,
        unique: true
    }
});

/*middleware*/
artSchema.pre('save', function (next) {
    this.slug = slugify(this.title);
    next();
});

/*create the model*/
const artModel = mongoose.model('Art', artSchema);
/*export the model*/
module.exports = artModel;

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}