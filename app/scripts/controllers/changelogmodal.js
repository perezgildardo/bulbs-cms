'use strict';

angular.module('bulbsCmsApp')
  .controller('ChangelogmodalCtrl', function ($scope, $http, $modalInstance, article) {
    $scope.article = article;

  });
