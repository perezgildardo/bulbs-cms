'use strict';

angular.module('customSearch.simpleContentSearch.directive', [])
  .directive('customSearch.simpleContentSearch', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-simple-content-search/custom-search-simple-content-search.html'
    };
  });
