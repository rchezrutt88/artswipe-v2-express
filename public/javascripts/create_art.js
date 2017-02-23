/**
 * Created by rdrutt on 2/22/17.
 */
$(document).ready(function () {

    function handleSubmitArt (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "localhost:3000/arts/create",
            data: $("#create-art-form").serialize(),
            dataType: "json",
        })
            .done(function () {
                console.log('it worked!');
            })
            .fail(function () {
                console.log('it did not work!');
            })
    }


    // Handler
    $("#create-art-form").submit(handleSubmitArt);

});