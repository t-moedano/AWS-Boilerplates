const AWS = require('aws-sdk');
const apiVersion = '2016-04-18';

/*
* Lambda function to create a custom redirect URL
*/
exports.customMessage = async (event, context, callback) => {
    if (event.triggerSource === 'CustomMessage_SignUp') {
        const { codeParameter } = event.request;
        const { userName, region } = event;
        const { clientId } = event.callerContext;
        const { email } = event.request.userAttributes;
        const link = `https://YourAPIPath/redirect?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}`;
        event.response.emailSubject = 'Almost there! Confirm your account!';
        event.response.emailMessage = `<p style="text-align: center;">
        <a>
            You may style your message with some HTML 
        </a>
        </p>
        <div style="you may put styles also">
            Click the confirmation link below to confirm your account =)
            <a href=${link} style="any style you want">Click here!</a>
        </div>`
    }
    callback(null, event);
};


exports.redirect = async (request, context, callback) => {
    try {

        const cognito = new AWS.CognitoIdentityServiceProvider({
            region: //your cognito region,
            apiVersion
        });

        const confirmationCode = request.queryStringParameters.code;
        const username = request.queryStringParameters.username;
        const clientId = request.queryStringParameters.clientId;

        const params = {
            ClientId: clientId,
            ConfirmationCode: confirmationCode,
            Username: username
        };

        await cognito.confirmSignUp(params).promise();

        return redirectResponse('Redirect succesfully');
    } catch (err) {
        return err;
    }
};


const redirectResponse = (message) => ({
    statusCode: 302,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        Location: 'http://yourWebsiteHere',
    },
    body: JSON.stringify(message),
});