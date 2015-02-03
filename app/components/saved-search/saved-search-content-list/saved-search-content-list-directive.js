'use strict';

angular.module('savedSearchContentList.directive', [])
  .directive('savedSearchContentList', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-content-list/saved-search-content-list.html'
    };
  });
