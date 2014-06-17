'use strict';

angular.module('bulbsCmsApp')
  .controller('VideothumbnailmodalCtrl', function ($scope, $http, $modalInstance, Zencoder, videoId, posterUrl, VIDEO_THUMBNAIL_URL) {
    var DEFAULT_THUMBNAIL = 4;
    $scope.MAX_THUMBNAIL = 19;
    $scope.posterUrl = posterUrl || compilePosterUrl(DEFAULT_THUMBNAIL);

    $scope.$watch('posterUrl', function(){
      var defaultUrl = VIDEO_THUMBNAIL_URL.replace('{{video}}', videoId);
      var thumbnailIndex = defaultUrl.indexOf('{{thumbnail}}');
      if($scope.posterUrl.indexOf(defaultUrl.substr(0, thumbnailIndex)) === 0){
        $scope.currentThumbnail = Number($scope.posterUrl.substr(thumbnailIndex, 4));
        console.log($scope.currentThumbnail)
      }else{
        $scope.currentThumbnail = false;
      }
    });

    $scope.nextThumb = function () {
      $scope.posterUrl = compilePosterUrl($scope.currentThumbnail+1);
    };

    $scope.prevThumb = function () {
      $scope.posterUrl = compilePosterUrl($scope.currentThumbnail-1);
    };

    $scope.defaultThumb = function () {
      $scope.posterUrl = compilePosterUrl(DEFAULT_THUMBNAIL);
    };

    $scope.setPoster = function () {
      $modalInstance.close($scope.posterUrl);
    };

    $scope.reencode = function () {
      Zencoder.encode(videoId);
    }

    function compilePosterUrl(thumbnail) {
      return VIDEO_THUMBNAIL_URL.replace('{{video}}', videoId).replace('{{thumbnail}}', pad4(thumbnail));
    }

    function pad4(num) {
      var s = "0000" + num;
      return s.substr(s.length-4);
    }
  });
