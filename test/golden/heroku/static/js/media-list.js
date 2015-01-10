app.controller('MediaListController', function($scope) {
  $scope.loadScript = function(video) {
    $.getScript("http://cdnapi.kaltura.com/p/" +
      video.partnerId  + "/sp/" +  video.partnerId + "00/" +
      "embedIframeJs/uiconf_id/27577942/partner_id/" + video.partnerId +
      "?autoembed=true&entry_id=" + video.id +
      "&playerId=kaltura_player_" + video.id +
      "&cache_st=1420925754&width=400&height=333")
    .then(function() {console.log('loaded script')},
          function(err) {console.log('err:' + err)})
  }
})
