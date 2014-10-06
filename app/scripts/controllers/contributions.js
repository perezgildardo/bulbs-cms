'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, routes, ContributionRoleService, ContentService)
  {
    $scope.contentId = parseInt($routeParams.id, 10);
    $scope.contributions = [];
    $scope.collapsed = [];

    $scope.save = save;
    $scope.add = add;
    $scope.remove = remove;
    $scope.roles = {};

    function save() {
      console.log($scope.contributions);
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
      $scope.collapsed.push(false);
    }

    function getRoles() {
      return ContributionRoleService.getList().then(function(roles){
        $scope.roles = {};
        roles.forEach(function(role) {
          $scope.roles[role.id] = role.name;
        });
        getContributions();
      });
    }

    function getContributions() {
      return ContentService.one($scope.contentId).all('contributions').getList().then(function(contributions) {
        for (var i in contributions) {
          if (contributions[i] === null || contributions[i].role === undefined) {
            continue;
          }
          var roleId = contributions[i].role.id;
          if (roleId && $scope.roles.hasOwnProperty(roleId)) {
            contributions[i].role = $scope.roles[roleId];
          }
        }
        $scope.contributions = contributions;
        $scope.collapsed = new Array(contributions.length);
        $scope.contributions.forEach(function(item, index){
          $scope.collapsed[index] = true;
        });
      });
    }

    function remove(index) {
      $scope.contributions.splice(index, 1);
      $scope.collapsed.splice(index, 1);
    }

    getRoles();

  });
