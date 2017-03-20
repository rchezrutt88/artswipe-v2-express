/**
 * Created by rdrutt on 3/20/17.
 */
require('dotenv').config();

const Art = require('./models/art'),
    User = require('./models/user'),
    AWS = require('aws-sdk'),
    fs = require('fs'),
    mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI);
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
    }
);

const s3 = new AWS.S3();

var artsData = require('./data/arts.json').arts;

Art.remove({}, (err) => {
    if (err) throw err
})

artsData.forEach(function (e) {

    const s3Key = `art-images/${e.file_name}`;

    const art = new Art({
        title: e.title,
        artist: e.artist,
        s3Key: s3Key
    });
    art.save((err, art) => {

        if (err) throw err;

        const bodyStream = fs.createReadStream(`./data/images/${e.file_name}`);

        s3.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: s3Key,
            Body: bodyStream
        }, (err, data) => {
            if (err) throw err;
        });

    });
});

var userData = require('./data/users.json').users;


User.remove({}, (err) => {
    if (err) throw err
});

userData.forEach(function (e) {

    const user = new User();
    user.email = e.email;
    user.password = user.generateHash(e.password);
    user.save((err) => {
        if (err) throw err;
    });
});