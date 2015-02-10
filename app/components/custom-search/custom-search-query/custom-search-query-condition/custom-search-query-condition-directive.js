'use strict';

angular.module('customSearch.query.condition.directive', [])
  .directive('customSearchQueryCondition', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-query/custom-search-query-condition/custom-search-query-condition.html'
    };
  });
