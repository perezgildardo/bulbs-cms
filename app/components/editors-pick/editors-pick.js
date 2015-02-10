'use strict';

angular.module('editorsPick', [
  'bulbsCmsApp.settings',
  'customSearch'
])
  .config(function ($routeProvider, routes) {
    $routeProvider
      .when('/cms/app/editors-pick/', {
        controller: function ($window) {
          // set title
          $window.document.title = routes.CMS_NAMESPACE + ' | Editor\'s Pick Tool';
        },
        templateUrl: routes.COMPONENTS_URL + 'editors-pick/editors-pick.html',
        reloadOnSearch: false
      });
  });
