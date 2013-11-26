var config = {
  authorizeUrl:           'https://{namespace}/authorize',
  loginWidgetUrl:         'https://{namespace}/login/',
  resourceOwnerEndpoint:  'https://{namespace}/oauth/ro',
  userInfoEndpoint:       'https://{namespace}/userinfo?access_token=',
  defaultCallback:        'https://{namespace}/mobile'
};

module.exports = {
  initialize: function(domain, clientId, clientSecret) {
    config.domain = domain;
    config.clientId = clientId;
    config.clientSecret = clientSecret;
  },
  login: function(options, callback) {
    // TODO
  }
};
