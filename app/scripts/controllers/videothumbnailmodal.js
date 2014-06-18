'use strict';

angular.module('bulbsCmsApp')
  .controller('VideothumbnailmodalCtrl', function ($scope, $http, $modalInstance, Zencoder, videoId, posterUrl, VIDEO_THUMBNAIL_URL, STATIC_IMAGE_URL) {
    var DEFAULT_THUMBNAIL = 4;
    var MAX_THUMBNAIL = 19;
    $scope.posterUrl = posterUrl || compilePosterUrl(DEFAULT_THUMBNAIL);
    $scope.uploadedImage = {id: null};
    $scope.mode = 'still';

    $scope.$watch('posterUrl', function(){
      var defaultUrl = VIDEO_THUMBNAIL_URL.replace('{{video}}', videoId);
      var thumbnailIndex = defaultUrl.indexOf('{{thumbnail}}');
      if($scope.posterUrl.indexOf(defaultUrl.substr(0, thumbnailIndex)) === 0){
        $scope.currentThumbnail = Number($scope.posterUrl.substr(thumbnailIndex, 4));
        $scope.uploadedImage.id = null;
      }else{
        $scope.currentThumbnail = false;
      }
    });

    $scope.$watch('uploadedImage.id', function(){
      console.log("new uploadedImage.id")
      console.log($scope.uploadedImage)
      if($scope.uploadedImage.id){
        $scope.posterUrl = STATIC_IMAGE_URL.replace('{{image}}', $scope.uploadedImage.id);
      }
    });

    $scope.nextThumb = function () {
      $scope.posterUrl = compilePosterUrl($scope.currentThumbnail < MAX_THUMBNAIL ? $scope.currentThumbnail+1 : 0);
    };

    $scope.prevThumb = function () {
      $scope.posterUrl = compilePosterUrl($scope.currentThumbnail > 0 ? $scope.currentThumbnail-1 : MAX_THUMBNAIL);
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
