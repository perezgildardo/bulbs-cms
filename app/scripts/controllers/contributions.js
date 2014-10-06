'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContributionRoleService, ContentService)
  {
    $scope.contentId = parseInt($routeParams.id, 10);
    $scope.contributions = [];

    $scope.save = save;
    $scope.add = add;
    $scope.remove = remove;
    $scope.roles = [];

    function save() {
      console.log($scope.contributions);
      return;
      ContentService.one($scope.contentId).all('contributions').post($scope.contributions).then(function(contributions){
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

    function getRoles() {
      return ContributionRoleService.getList().then(function(roles){
        $scope.roles = roles;
      });
    }

    function getContributions() {
      return ContentService.one($scope.contentId).all('contributions').getList().then(function(contributions) {
        $scope.contributions = contributions;
      });
    }

    function remove(index) {
      $scope.contributions.splice(index, 1);
    }


    getContributions();
    getRoles();


  });
