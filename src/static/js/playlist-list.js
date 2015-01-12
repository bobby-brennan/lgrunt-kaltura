app.controller('PlaylistListController', function($scope) {
  $scope.loadScript = function(playlist) {
    var scriptUrl = "https://cdnapisec.kaltura.com/p/" +
      playlist.partnerId  + "/sp/" +  playlist.partnerId + "00/" +
      "embedIframeJs/uiconf_id/27723562/partner_id/" + playlist.partnerId +
      "?autoembed=true" +
      "&playerId=kaltura_player_" + playlist.id +
      "&width=400&height=680" +
      "&flashvars[streamerType]=auto&flashvars[playlistAPI.kpl0Id]=" + playlist.id;
    $.getScript(scriptUrl)
    .then(function() {},
          function(err) {console.log('err:' + err)})
  }

  $scope.getHeight = function(playlist) {
    return $scope.getWidth(playlist) * 333 / 680;
  }

  $scope.getWidth = function(playlist) {
    return $('.playlist-container').width()
  }
})
