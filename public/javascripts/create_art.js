/**
 * Created by rdrutt on 2/22/17.
 */
$(document).ready(function () {

    var albumBucketName = 'artswipe';
    var bucketRegion = 'us-east-1';
    var IdentityPoolId = 'us-east-1:b37b4719-c6b5-4f1e-af83-65c725212309';
    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: albumBucketName}
    });

    function addPhoto(albumName) {
        var files = $("#fileupload").get()[0].files;
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '//';

        var photoKey = albumPhotosKey + fileName;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return console.log(err.message);
            }
            console.log('Successfully uploaded photo.');
            // viewAlbum(albumName);
        });
    }

    // function uploadImageToAWS(e) {
    //
    //
    //     e.preventDefault();
    //     addPhoto('test');
    //     // $.ajax({
    //     //     method: "POST",
    //     //     url: "http://artswipe.s3.amazonaws.com",
    //     //     contentType: 'binary/octet-stream',
    //     //     processData: false,
    //     //     data: $("#fileupload").get()[0].files[0]
    //     // })
    //     //     .done(function (data) {
    //     //         console.log(data);
    //     //         console.log('file upload success?')
    //     //     })
    //     //     .fail(function (error) {
    //     //         console.log(error)
    //     //         console.log('file upload fail?')
    //     //     });
    // }

    function handleSubmitArt (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/arts/create",
            data: $("#create-art-form").serialize(),
            dataType: "json",
        })
            .then(addPhoto('test'))
            .done(function (data) {
                console.log(data);
            })
            .fail(function (error) {
                console.log(error);
            })
    }


    // Handler
    $("#create-art-form").submit(handleSubmitArt);

});