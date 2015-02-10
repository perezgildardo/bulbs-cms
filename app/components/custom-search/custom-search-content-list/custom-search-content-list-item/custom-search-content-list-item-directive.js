'use strict';

angular.module('customSearch.contentListItem.directive', [])
  .directive('customSearchContentListItem', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-content-list/custom-search-content-list-item/custom-search-content-list-item.html'
    };
  });
