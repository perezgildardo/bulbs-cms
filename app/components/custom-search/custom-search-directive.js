'use strict';

angular.module('customSearch.directive', [
  'bulbsCmsApp.settings',
  'customSearch.service',
  'customSearch.query',
])
  .directive('customSearch', function (routes) {
    return {
      controller: function ($scope, CustomSearchService) {

        $scope.customSearchService = new CustomSearchService();

        $scope.$query = $scope.customSearchService.$queryBinding();

      },
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search.html'
    };
  });
