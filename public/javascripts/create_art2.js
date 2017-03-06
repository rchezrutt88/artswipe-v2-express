/**
 * Created by rdrutt on 2/22/17.
 */
$(document).ready(function () {

    function getSignedRequest(file) {
        var art = $("#create-art-form").serializeArray();
        // debugger;
        $.ajax({
            url: '/arts/create/get-signed-request',
            method: 'GET',
            data: {
                title: art[0]['value'],
                artist: art[1]['value'],
                file_name: file.name,
                file_type: file.type
            }
        }).done(function (data) {
            debugger;
            console.log(data);
            uploadToS3(file, data.signedRequest, data.url);
        }).fail(function (err) {
            console.log(err);
        }).always(function (arg) {
        });
    }

    function initUpload(e){
        e.preventDefault();
        const file = $("#fileupload").get()[0].files[0];
        if(file == null){
            return alert('No file selected.');
        }
        getSignedRequest(file);
    }

    function uploadToS3(file, signedRequest, url) {
        debugger;
        $.ajax({
                url: signedRequest,
                method: 'PUT',
                contentType: 'binary/octet-stream',
                processData: false,
                data: file
            }
        ).done(function (data) {
            console.log(data);
            console.log('upload succeeded');
        }).fail(function (err) {
            console.log(err);
            console.log('upload failed');
        }).always(function (arg) {
        })
    }

    $("#create-art-form").submit(initUpload);

});