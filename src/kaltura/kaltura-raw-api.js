var FS = require('fs');
var KalturaConstants = require('./KalturaTypes.js');
var Kaltura = require('./KalturaClient.js');

var KalturaClient = null;

var Session = null;

exports.initialize = function(secrets, callback) {
  secrets.partner_id = +secrets.partner_id;
  var config = new Kaltura.KalturaConfiguration(secrets.partner_id);
  KalturaClient = new Kaltura.KalturaClient(config);
  KalturaClient.session.start(function(session) {
    KalturaClient.setKs(session);
    Session = session;
    callback();
  }, secrets.admin_secret, secrets.user_id, KalturaConstants.KalturaSessionType.ADMIN,
     secrets.partner_id, secrets.session_length);
}

exports.initialized = function() { return KalturaClient !== null }

exports.listMedia = function(filterOptions, callback) {
  var filter = new Kaltura.objects.KalturaMediaEntryFilter();
  for (var key in filterOptions) {
    filter[key] = filterOptions[key];
  }
  var pager = new Kaltura.objects.KalturaFilterPager();
  KalturaClient.media.listAction(function(results) {
    if (results.objectType === 'KalturaAPIException') return callback(results);
    callback(null, results.objects);
  }, filter, pager);
}

exports.listPlaylists = function(filterOptions, callback) {
  var filter = new Kaltura.objects.KalturaPlaylistFilter();
  for (var key in filterOptions) {
    filter[key] = filterOptions[key];
  }
  var pager = new Kaltura.objects.KalturaFilterPager();
  KalturaClient.playlist.listAction(function(results) {
    if (results.objectType === 'KalturaAPIException') return callback(results);
    callback(null, results.objects);
  }, filter, pager);
}

exports.like = function(options, callback) {
  KalturaClient.like.like(function(result) {
    if (result.objectType === 'KalturaAPIException') return callback(result);
    callback(null, result);
  }, options.entryId)
}

exports.unlike = function(options, callback) {
  KalturaClient.like.unlike(function(result) {
    if (result.objectType === 'KalturaAPIException') return callback(result);
    callback(null, result);
  }, options.entryId)
}

exports.checkLikeExists = function(options, callback) {
  KalturaClient.like.checkLikeExists(function(result) {
    if (result.objectType === 'KalturaAPIException') return callback(result);
    callback(null, result);
  }, options.entryId)
}
