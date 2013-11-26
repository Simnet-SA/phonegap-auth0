function Auth0Client(domain, clientId, callbackURL) {

  if (!(this instanceof Auth0Client)) {
    return new Auth0Client(domain, clientId, callbackURL);
  }

  this.auth0 = new Auth0({
    domain:       domain,
    clientID:     clientId,
    callbackURL:  callbackURL
  });
}

Auth0Client.prototype.login = function (options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (!options) options = {};
  if (!callback) callback = function () { };

  this.auth0.login(options, callback);
};

module.exports = Auth0Client;
