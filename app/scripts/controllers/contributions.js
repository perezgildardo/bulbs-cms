'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContentService)
  {

    $scope.contributions = [];

    function getContributions() {
      return ContentService.one(6).all('contributions').getList().then(function(contributions) {
        $scope.contributions = contributions;
      });
    }
    getContributions();

  });
