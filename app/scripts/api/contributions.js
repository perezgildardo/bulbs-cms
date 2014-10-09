angular.module('bulbs.api').
  factory('ContributionRoleService', function (Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/cms/api/v1/contributions/');
      RestangularConfigurer.setRequestSuffix('/');
    }).service('role');
  }).
  factory('ContributionReportingService', function(Restangular) {

    Restangular.extendModel('reporting', function (obj) {
      obj.user = angular.extend(obj.user, {
        toString: function() {
          return obj.user.full_name || obj.user.username;
        },
      });
      obj.content = angular.extend(obj.content, {
        toString: function() {
          return obj.content.title;
        },
      });
      return obj;
    });

    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/cms/api/v1/contributions/');
      RestangularConfigurer.setRequestSuffix('/');
    }).service('reporting');
  });