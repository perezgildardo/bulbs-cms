'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContentApi, ContributionService)
  {


    function getContributions() {
      return ContributionService.getList({'content': $routeParams.id}).then(function(data) {
        $scope.contributions = data;
      });
    }
    getContributions();

  });
