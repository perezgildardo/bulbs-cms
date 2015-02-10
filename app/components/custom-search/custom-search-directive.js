'use strict';

angular.module('customSearch.directive', [
  'bulbsCmsApp.settings',
  'customSearch.service',
  'customSearch.contentList',
  'customSearch.query',
  'customSearch.simpleContentSearch'
])
  .directive('customSearch', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search.html'
    };
  });
