app.controller('LikeController', function($scope) {
  $scope.liked = false;
  $scope.loadData = function() {
    $scope.checkLikeExists(function(result) {
      $scope.liked = result;
      $scope.$apply();
    });
  }
  $scope.toggleLike = function() {
    if (!$scope.liked) {
      $scope.like(function(result) { $scope.loadData(); })
    } else {
      $scope.unlike(function(result) { $scope.loadData(); })
    }
  }
})

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
