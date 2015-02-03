'use strict';

angular.module('savedSearchQuery.directive', [
  'savedSearchQueryCondition'
])
  .directive('savedSearchQuery', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-query/saved-search-query.html'
    };
  });
