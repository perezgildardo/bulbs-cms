'use strict';

angular.module('bulbsCmsApp')
  .directive('autocomplete', function (routes) {
    return {
      restrict: 'E',
      scope: {
        value: '=',
        service: '=',
        displayKey: '=',
        multiple: '=?',
        searchParam: '=?',
        placeholder: '=?'
      },
      controller: function ($scope, $element, $attrs, $injector) {
        var service = $injector.get($attrs.service);
        console.log(service.getList({"search": "test"}));
        $scope.multiple = angular.isDefined($scope.multiple) ? $scope.multiple : false;
        $scope.searchParam = angular.isDefined($scope.searchParam) ? $scope.searchParam : 'search';
        $scope.placeholder = angular.isDefined($scope.placeholder) ? $scope.placeholder : 'Placeholder';
      },
      link: function (scope, element, attrs) {
        console.log(element.find('input')[0]);
        element.find('input').on('keyup', function(e) {
          console.log(angular.element(this).val());
        });
      },
      templateUrl: routes.PARTIALS_URL + 'autocomplete.html'
    };
  });
