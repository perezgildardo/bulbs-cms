'use strict';

angular.module('savedSearchQueryCondition.directive', [])
  .directive('savedSearchQueryCondition', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-query/saved-search-query-condition/saved-search-query-condition.html'
    };
  });
