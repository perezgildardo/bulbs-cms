'use strict';

angular.module('savedSearch', [
  'bulbsCmsApp.settings',
  'savedSearch.directive'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/saved-search/', {
        controller: function ($window) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Saved Search Tool';
        },
        templateUrl: routes.COMPONENTS_URL + 'saved-search/saved-search-page-wrapper.html',
        reloadOnSearch: false
      });
  });
