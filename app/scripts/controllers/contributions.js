'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContentService)
  {
    $scope.contentId = $routeParams.id;
    $scope.contributions = [];

    $scope.save = save;
    $scope.add = add;

    function getContributions() {
      return ContentService.one($scope.contentId).all('contributions').getList().then(function(contributions) {
        $scope.contributions = contributions;
      });
    }
    getContributions();

    function save() {
      ContentService.one($scope.contentId).all('contributions').post(data).then(function(contributions){
        getContributions();
      });
    }

    function add() {
      $scope.contributions.push({
        contributor: null,
        content: $scope.contentId,
        role: null
      });
    }

  });
