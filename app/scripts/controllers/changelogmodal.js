'use strict';

angular.module('bulbsCmsApp')
  .controller('ChangelogmodalCtrl', function ($scope, $http, $modalInstance, ContentApi, article) {
    $scope.article = article;

    ContentApi.all('log').getList({content: article.id}).then(function (data) {
      $scope.changelog = data;
    });

  });
