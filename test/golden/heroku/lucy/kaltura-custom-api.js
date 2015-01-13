var Client = require('./.././kaltura/kaltura-raw-api.js');

var Secrets = null;
exports.initialize = function(secrets, callback) {
  if (Client.initialize) {
    Client.initialize(secrets, callback);
  } else {
    Secrets = secrets;
    callback();
  }
}
exports.initialized = function() {
  return Client.initialize ? Client.initialized() : Secrets !== null;
}

exports.newestMedia_listMedia = function(nameLike, callback) {
  var params = {
    'orderBy': '+createdAt',
    'nameLike': nameLike,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.listMedia(params, callback);}
exports.samplePlaylists_listPlaylists = function(nameLike, callback) {
  var params = {
    'nameLike': nameLike || "videos",
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.listPlaylists(params, callback);}
exports.likeVideo_checkLikeExists = function(entryId, callback) {
  var params = {
    'entryId': entryId,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.checkLikeExists(params, callback);}
exports.likeVideo_like = function(entryId, callback) {
  var params = {
    'entryId': entryId,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.like(params, callback);}
exports.likeVideo_unlike = function(entryId, callback) {
  var params = {
    'entryId': entryId,
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.unlike(params, callback);}

