'use strict';

angular.module('bulbsCmsApp')
  .service('Gettemplate', function Gettemplate() {
    this.get = function () {
      var template = $templateCache.get(templateUrl);
      if (template) {
        return $q.when(template);
      }else {
        var deferred = $q.defer();
        $http.get(templateUrl, {cache: true}).success(function (html) {
          $templateCache.put(templateUrl, html);
          deferred.resolve(html);
        });
        
        return deferred.promise;
      }
    }
  });
