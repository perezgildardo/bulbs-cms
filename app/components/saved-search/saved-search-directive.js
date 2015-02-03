'use strict';

angular.module('savedSearch.directive', [
  'bulbsCmsApp.settings',
  'savedSearchContentList',
  'savedSearchQuery',
  'savedSearchSimpleContentSearch'
])
  .directive('savedSearch', function (routes) {
    return {
      controller: function ($scope) {


        
      },
      restrict: 'E',
      scope: {},
      templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search.html'
    };
  });
