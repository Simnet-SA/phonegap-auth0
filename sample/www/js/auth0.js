function Auth0Client(domain, clientId, clientSecret) {

  this.AuthorizeUrl           = "https://{domain}/authorize";
  this.LoginWidgetUrl         = "https://{domain}/login/";
  this.ResourceOwnerEndpoint  = "https://{domain}/oauth/ro";
  this.UserInfoEndpoint       = "https://{domain}/userinfo?access_token=";
  this.DefaultCallback        = "https://{domain}/mobile";

  this.domain = domain;
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}

Auth0Client.prototype.login = function (options, callback) {

  var parseResult = this._parseResult;
  var getUserInfo = this._getUserInfo;
  var userInfoEndpoint = this.UserInfoEndpoint.replace(/{domain}/, this.domain);

  if (typeof options === 'function') {
      callback = options;
      options = {};
  }

  if (!options) options = {};
  if (!callback) callback = function () { };

  // defaults
  options.scope = options.scope ? encodeURI(options.scope) : "openid";
  options.connection = options.connection || '';

  var done = function (result) {
    var endpoint = userInfoEndpoint + result.access_token;
    getUserInfo(endpoint, function (err, profile) {
      if (err) return callback(err);

      var auth0User = {
        auth0AccessToken: result.access_token,
        idToken: result.id_token,
        profile: profile
      };

      return callback(null, auth0User);
    });
  };

  if (options.connection && options.username) {
    // RO endpoint
    //var endpoint = this.ResourceOwnerEndpoint.replace(/{domain}/, this.domain);
    //var parameters = "client_id=" + this.clientId + "&client_secret=" + this.clientSecret + "&connection=" + options.connection + "&username=" + options.username + "&password=" + options.password + "&grant_type=password&scope=" + options.scope;

    // TODO
    callback();
  }
  else {
    
    var authorizeUrl = this.AuthorizeUrl.replace(/{domain}/, this.domain);
    var loginWidgetUrl = this.LoginWidgetUrl.replace(/{domain}/, this.domain);
    var callbackUrl = this.DefaultCallback.replace(/{domain}/, this.domain);

    authorizeUrl += "?client_id=" + this.clientId + "&redirect_uri=" + callbackUrl + "&response_type=token&scope=" + options.scope + "&connection=" + options.connection;
    loginWidgetUrl += "?client=" + this.clientId + "&redirect_uri=" + callbackUrl + "&response_type=token&scope=" + options.scope;

    var auth0Url = options.connection ? authorizeUrl : loginWidgetUrl;

    var authWindow = window.open(options.connection ? auth0Url : loginWidgetUrl, '_blank', 'location=no,toolbar=no');
    authWindow.addEventListener('loadstart', function (e) {

      alert(JSON.stringify(e));

      if (e.url.indexOf(callbackUrl + '#') !== 0) return;
      
      var parsedResult = parseResult(e.url);
      authWindow.close();
      return done(parsedResult);
    });
  }
};

Auth0Client.prototype._getUserInfo = function (endpoint, callback) {

  // TODO
  callback(null, {
    profile: { name: 'jdoe' }
  });
};

Auth0Client.prototype._parseResult = function (result) {

    var tokens = {};
    var strTokens = result.split("#")[1].split("&");

    for (var i in strTokens) {
        var tok = strTokens[i].split("=");
        tokens[tok[0]] = tok[1];
    }

    return tokens;
};

module.exports = Auth0Client;
