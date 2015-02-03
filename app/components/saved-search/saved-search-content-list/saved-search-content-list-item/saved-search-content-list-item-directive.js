'use strict';

angular.module('savedSearchContentListItem.directive', [])
  .directive('savedSearchContentListItem', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-content-list/saved-search-content-list-item/saved-search-content-list-item.html'
    };
  });
