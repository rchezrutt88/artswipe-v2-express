/**
 * Created by rdrutt on 2/22/17.
 */
$(document).ready(function () {

    function handleSubmitArt (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/arts/create",
            data: $("#create-art-form").serialize(),
            dataType: "json",
        })
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