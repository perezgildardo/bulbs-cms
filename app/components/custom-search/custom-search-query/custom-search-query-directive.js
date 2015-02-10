'use strict';

angular.module('customSearch.query.directive', [
  'customSearch.query.condition'
])
  .directive('customSearchQuery', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {
        model: '=',
        remove: '&'
      },
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-query/custom-search-query.html'
    };
  });
