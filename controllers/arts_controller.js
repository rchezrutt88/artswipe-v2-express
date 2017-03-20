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
    getSignedRequest: getSignedRequest
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

/*should also include user*/
function processCreate(req, res, next) {
    const S3_KEY = `art-images/${req.query['file_name']}`;
    const art = new Art({
        title: req.query.title,
        artist: req.query.artist,
        s3Key: S3_KEY,
        uploader: req.user.name
    });

    art.save((err, art) => {
        if (err)
            throw err;
        res.locals.art = art;
        next();
    });
}

function getSignedRequest(req, res) {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION
    });

    const s3 = new AWS.S3();
    const S3_BUCKET = process.env.BUCKET_NAME;

    // var re = /(?:\.([^.]+))?$/
    const fileName = req.query['file_name'];
    const fileType = req.query['file_type'];
    const key = `art-images/${fileName}`;
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: key,
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
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${key}`,
        };
        res.json(returnData);
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