'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    _, routes, ContributionRoleService, ContentService)
  {

    $scope.NAV_LOGO = routes.NAV_LOGO;
    $scope.contentId = parseInt($routeParams.id, 10);
    $scope.contributions = [];
    $scope.collapsed = [];

    $scope.save = save;
    $scope.add = add;
    $scope.remove = remove;
    $scope.roles = [];

    function save() {
      // I know, I'm not supposed to do DOM manipulation in controllers. TOO BAD.
      angular.element('#save-btn').html('<i class="glyphicon glyphicon-refresh fa-spin"></i> Saving');
      console.log($scope.contributions);
      ContentService.one($scope.contentId).all('contributions').post($scope.contributions).then(function(contributions){
        getContributions();
        angular.element('#save-btn').html('<i class="glyphicon glyphicon-floppy-disk"></i> Save</button>');
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
        $scope.roles = roles;
        getContributions();
      });
    }

    function getContributions() {
      return ContentService.one($scope.contentId).all('contributions').getList().then(function(contributions) {
        for (var i in contributions) {
          if (contributions[i] === null || contributions[i].role === undefined) {
            continue;
          }
          // var roleId = contributions[i].role.id;
          // var role = _.find($scope.roles, function(role){
          //   return role.id == roleId;
          // });

          // if (role) {
          //   contributions[i].role = role;
          // }
        }
        $scope.contributions = contributions;
        $scope.collapsed = new Array(contributions.length);
        $scope.contributions.forEach(function(item, index){
          $scope.collapsed[index] = true;
        });
      });
    }

    function getContent() {
      ContentService.one($scope.contentId).get().then(function(content) {
        $scope.content = content;
      })
    }

    function remove(index) {
      $scope.contributions.splice(index, 1);
      $scope.collapsed.splice(index, 1);
    }

    getRoles();
    getContent();

  });
