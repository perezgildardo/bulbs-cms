'use strict';

angular.module('savedSearchSimpleContentSearch.directive', [])
  .directive('savedSearchSimpleContentSearch', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-simple-content-search/saved-search-simple-content-search.html'
    };
  });
