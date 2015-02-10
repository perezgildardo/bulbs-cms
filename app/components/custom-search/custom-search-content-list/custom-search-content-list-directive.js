'use strict';

angular.module('customSearch.contentList.directive', [])
  .directive('customSearchContentList', function (routes) {
    return {
      controller: function ($scope) {},
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-content-list/custom-search-content-list.html'
    };
  });
