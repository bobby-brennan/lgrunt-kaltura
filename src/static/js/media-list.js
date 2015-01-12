app.controller('MediaListController', function($scope) {
  $scope.loadScript = function(video) {
    $.getScript("https://cdnapisec.kaltura.com/p/" +
      video.partnerId  + "/sp/" +  video.partnerId + "00/" +
      "embedIframeJs/uiconf_id/27577942/partner_id/" + video.partnerId +
      "?autoembed=true&entry_id=" + video.id +
      "&playerId=kaltura_player_" + video.id +
      "&width=400&height=333")
    .then(function() {},
          function(err) {console.log('err:' + err)})
  }
})
