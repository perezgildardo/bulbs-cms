'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContentApi, ContributionService)
  {

    $scope.contributors = {};

    function getContributions() {
      return ContributionService.getList({'content': $routeParams.id}).then(function(data) {

        for (var i in data) {
          var contribution = data[i];
          var userId = data[i].contributor.id;
          if ($scope.contributors[userId] === undefined) {
            $scope.contributors[userId] = [];
          }
          $scope.contributors[userId].push(contribution);
        }
      });
    }
    getContributions();

  });
