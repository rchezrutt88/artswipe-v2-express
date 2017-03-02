$(document).ready(function () {

    AWS.config.region = 'us-east-1';

    function handleCreateUser(e) {
        e.preventDefault();
        var poolData = {
            UserPoolId: 'us-east-1_rhPyYCVhu',
            ClientId: '6669lgq5ti9mplpunfnf7q3129'
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: 'email@mydomain.com'
        };
        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: '+14325551212'
        };
        var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);

        var cognitoUser;

        userPool.signUp('john', 'Password123!', attributeList, null, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
    }


    $('#create-user').submit(handleCreateUser);


});
