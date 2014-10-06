angular.module('bulbs.api').
  factory('ContributionRoleService', function (Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setBaseUrl('/cms/api/v1/contributions/');
      RestangularConfigurer.setRequestSuffix('/');
    }).service('role');
  });