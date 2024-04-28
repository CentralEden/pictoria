const { Authenticator } = require('cognito-at-edge');

const authenticator = new Authenticator({
  region: '{{REGION}}', // user pool region
  userPoolId: '{{USER_POOL_ID}}', // user pool ID
  userPoolAppId: '{{APP_CLIENT_ID}}', // user pool app client ID
  userPoolDomain: '{{DOMAIN}}', // user pool domain
});

exports.handler = async (request) => authenticator.handle(request);
