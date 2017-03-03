/**
 * Created by rdrutt on 2/17/17.
 */
const Art = require('../models/art');
const AWS = require('aws-sdk');
const passport = require('passport');

var s3 = new AWS.S3();


module.exports = {
    showArts: showArts,
    seedArts: seedArts,
    showSingle: showSingle,
    showCreate: showCreate,
    processCreate: processCreate
}


/**
 * Show all arts
 *
 * @param req
 * @param res
 */
function showArts(req, res) {
    Art.find({}, (err, arts) => {
        arts.forEach(function (art) {
            art.url = S3urlHelper('artswipe', 'art-images', art.id);
        })
        res.render('arts', {arts: arts});
    });
}

// function getArtImages(req, res) {
//     passport.authenticate('')
// }

/**
 * Show single art
 *
 * @param req
 * @param res
 */
function showSingle(req, res) {
    Art.find({slug: req.params.slug}, (err, art) => {

        res.send(art)

        });
}

/**
 *
 * @param req
 * @param res
 */
function showCreate(req, res) {
    res.render('create_art');
}

function processCreate(req, res) {
    const art = new Art({
        title: req.body.title
    });

    art.save((err) => {
        if (err)
            throw err;

        res.redirect('/arts/${event.slug}');
    });
}


function seedArts(req, res) {

    const arts = [
        {title: 'Mona Lisa', artist: 'Leonardo Da Vinci'},
        {title: 'Girl with a Pearl Earing', artist: 'Johannes Vermeer'}
    ];

    Art.remove({}, () => {

        for (art of arts) {
            var newArt = new Art(art);
            newArt.save();
        }

    });

    res.send('Database seeded!')

}

function S3urlHelper(bucketname, folder, objectId) {
    return `https://s3.amazonaws.com/${bucketname}/${folder}/${objectId}.jpg`
}