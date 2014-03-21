'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

var jquery = angular.module('jquery', []);
jquery.factory('$', function() {
  return window.$; // assumes jquery has already been loaded on the page
});

angular.module('bulbsCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'jquery',
  'underscore'
])
  .config(function ($locationProvider, $routeProvider, $sceProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/cms/app/list/:queue/', {
        templateUrl: '/views/contentlist.html',
        controller: 'ContentListCtrl'
      })
      .when('/cms/app/edit/:id/', {
        templateUrl: '/views/contentedit.html',
        controller: 'ContenteditCtrl'
      })
      .otherwise({
        redirectTo: '/cms/app/list/published/'
      });

    //TODO: whitelist staticonion.
    $sceProvider.enabled(false);
    /*.resourceUrlWhitelist([
    'self',
    STATIC_URL + "**"]);*/

  })
  .config(['$httpProvider', function($httpProvider) {
    // NOTE: this probably isn't quite the right place for this:
    $httpProvider.defaults.withCredentials = true;
  }])
  .run(function($rootScope, $http, $cookies){
    // set the CSRF token here
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  });

// https://github.com/angular/angular.js/issues/992
angular.module('ngResource').config([
  '$provide', '$httpProvider',
  function($provide, $httpProvider) {
    $provide.decorator('$resource', function($delegate) {
        return function() {
            if (arguments.length > 0) {  // URL
                arguments[0] = arguments[0].replace(/\/$/, '\\/');
            }

            if (arguments.length > 2) {  // Actions
                angular.forEach(arguments[2], function(action) {
                    if (action && action.url) {
                        action.url = action.url.replace(/\/$/, '\\/');
                    }
                });
            }

            return $delegate.apply($delegate, arguments);
        };
    });

    $provide.factory('resourceEnforceSlashInterceptor', function() {
        return {
            request: function(config) {
                config.url = config.url.replace(/[\/\\]+$/, '/');
                return config;
            }
        };
    });

    $httpProvider.interceptors.push('resourceEnforceSlashInterceptor');
  }
]);