/**
 * Created by rdrutt on 2/22/17.
 */
$(document).ready(function () {

    function getSignedRequest(file) {
        $.get({
            url: '/arts/create/get-signed-request',
            data: {
                file_name: file.name,
                file_type: file.type
            }
        }).done(function (data) {

        }).fail(function (err) {

        });
    }

    function initUpload(){
        const file = $("#fileupload").get()[0].files[0];
        if(file == null){
            return alert('No file selected.');
        }
        getSignedRequest(file);
    }

    $("#create-art-form").submit(handleSubmitArt);

});