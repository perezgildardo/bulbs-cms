'use strict';

angular.module('bulbsCmsApp')
  .service('Zencoder', function Zencoder($http, $q, $, $window) {
    var newVideoUrl = '/video/new';
    var fileInputId = '#bulbs-cms-hidden-video-file-input'
    var inputTemplate = '<input id="bulbs-cms-hidden-video-file-input" type="file" style="position: absolute; left:-99999px;" name="video" />'

    console.log("Zencoder")

    this.onVideoFileUpload = function(){
      //attach this via ng-click to any element
      console.log("onVideoFileUpload")
      console.log(this)

      var deferred = $q.defer();

      angular.element(fileInputId).remove();
      var fileInput = angular.element(inputTemplate);
      angular.element('body').append(fileInput);
      fileInput.click();
      fileInput.unbind('change');
      fileInput.bind('change', function(elem){
        var fileInput = $("#s3upload-file-input")[0];
        var file;

        if(fileInput.files.length !== 0) {
          file = fileInput.files[0];

          // We have a file upload limit of 1024MB
          if (file.size > (1024 * 1024 * 1024)) {
            alert("Upload file cannot be larger than 1024MB.");
            return;
          }

          if (file.type.indexOf('video/') !== 0) {
            deferred.reject("You must upload a video file.");
          }
        } else {
          return;
        }
      });

      return deferred.promise;



    }

    $window.getNewVideoUploadCredentials = function(videoName) {
      var data = {name: videoName}
      data = $.param(data);

      $http({
        method: 'POST',
        url: newVideoUrl,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        console.log(data);
      }).error(function(data){
        console.log(data);
      });
    };


  });
