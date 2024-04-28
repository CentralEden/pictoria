const { Authenticator } = require('cognito-at-edge');

const authenticator = new Authenticator({
  region: '{{REGION}}', // user pool region
  userPoolId: '{{USER_POOL_ID}}', // user pool ID
  userPoolAppId: '{{APP_CLIENT_ID}}', // user pool app client ID
  userPoolDomain: '{{DOMAIN}}', // user pool domain
  logoutConfiguration: {
    logoutUri: '/logout',
    logoutRedirectUri: '{{REDIRECT_URI}}'
  }
});

exports.handler = async (request) => authenticator.handle(request);
