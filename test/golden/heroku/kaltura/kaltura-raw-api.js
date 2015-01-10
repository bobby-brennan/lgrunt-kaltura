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
    callback(null, results.objects);
  }, filter, pager);
}
