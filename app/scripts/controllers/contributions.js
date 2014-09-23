'use strict';

angular.module('bulbsCmsApp')
  .controller('ContributionsCtrl', function (
    $scope, $routeParams, $http, $window,
    $location, $timeout, $compile, $q, $modal,
    $, _, keypress, Login, routes, ContentApi)
  {

    function getContent() {
      return ContentApi.one('content', $routeParams.id).get().then(function(data){
        $scope.article = data;
      });
    }
    getContent();

    $scope.$watch('article.title', function () {
      $window.document.title = routes.CMS_NAMESPACE + ' | Contributions for ' + ($scope.article && $('<span>' + $scope.article.title + '</span>').text());
    });

  });
