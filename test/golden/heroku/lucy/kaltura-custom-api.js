var Client = require('./.././kaltura/kaltura-raw-api.js');

var Secrets = null;
exports.initialize = function(secrets, callback) {
  console.log('init client1');
  if (Client.initialize) {
    console.log('init client');
    Client.initialize(secrets, callback);
  } else {
    Secrets = secrets;
    callback();
  }
}
exports.initialized = function() {
  return Client.initialize ? Client.initialized() : Secrets !== null;
}

exports.newestMedia = function(nameLike, callback) {
  var params = {
    'orderBy': '+createdAt',
    'nameLike': nameLike,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.listMedia(params, callback);}

