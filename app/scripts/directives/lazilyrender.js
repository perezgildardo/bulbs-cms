'use strict';

angular.module('bulbsCmsApp')
  .directive('lazilyRender', function (routes, $, $rootScope, $compile, $q, $http, $templateCache) {

    function getTemplate (templateUrl) {
      var template = $templateCache.get(templateUrl);
      if (template) {
        console.log('returning from cache')
        return $q.when(template);
      }else {
        var deferred = $q.defer();
        $http.get(templateUrl, {cache: true}).success(function (html) {
          deferred.resolve(html);
        });
        
        return deferred.promise;
      }
    }

    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs){
        var templateUrl = routes.PARTIALS_URL + attrs.template;
        var $element = $(element);
        
        scope.$evalAsync(function(){
          scope.$watch(function(){
            return $element.is(':visible');
          }, function(visible){
            if(visible && !scope.loaded){
              scope.loaded = true;
              getTemplate(templateUrl).then(function(html){
                var template = angular.element(html);
                var compiledEl = $compile(template)(scope);
                element.append(compiledEl);
                element.css('height', 'auto');
              });
            }
          });
        });
        
      }
    };
  });
