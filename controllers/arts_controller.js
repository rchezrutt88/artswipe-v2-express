/**
 * Created by rdrutt on 2/17/17.
 */
const Art = require('../models/art');
const AWS = require('aws-sdk');
const passport = require('passport');
require('dotenv').config();


module.exports = {
    showArts: showArts,
    seedArts: seedArts,
    showSingle: showSingle,
    showCreate: showCreate,
    processCreate: processCreate,
    getSignedUrl: getSignedUrl
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

function processCreate(req, res, next) {
    const art = new Art({
        title: req.body.title,
        artist: req.body.artist
    });

    art.save((err, art) => {
        if (err)
            throw err;
        res.art = art;
        next();
    });
}

function getSignedUrl(req, res) {
    const s3 = new AWS.S3();
    const S3_BUCKET = process.env.BUCKET_NAME;
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, function (err, data) {
        if(err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest:  data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
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