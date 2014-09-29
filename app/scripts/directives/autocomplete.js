'use strict';

angular.module('bulbsCmsApp')
  .directive('autocomplete', function ($animate, $compile, routes) {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      controller: function ($scope, $element, $attrs, $injector) {
        $scope.service = $injector.get($attrs.service);
      },
      link: function ($scope, element, attrs, ngModel) {
        if(attrs.labelAttr) {
          ngModel.$formatters.push(function () {
            return ngModel.$modelValue[attrs.labelAttr];
          });
        }

        // ngModel.$render = function () {
        //   if(attrs.labelAttr) {
        //     ngModel.$viewValue = ngModel.$modelValue[attrs.labelAttr];
        //     element.change();
        //   }
        // };

        var menuHidden = true;

        var menuScope = $scope.$new();
        menuScope.items = [];
        menuScope.index = 0;
        menuScope.setIndex = function (index) {
          menuScope.index = index;
        }
        menuScope.label = function (index) {
          var val = menuScope.items[index][attrs.labelAttr];
          return typeof(val) == "function" ? val() : val;
        }
        menuScope.select = function (index) {
          ngModel.$setViewValue(menuScope.items[index]);
          hideMenu();
        }

        var menuEl = angular.element('<ul class="autocomplete-menu"><li ng-repeat="item in items" ng-click="select($index)" ng-class="{\'active\': $index == index}" ng-mouseenter = "setIndex($index)"><span>{{ label($index) }}</span></li></ul>');
        angular.element('body').append(menuEl);
        menuEl.find('li').css('display', 'block');
        menuEl.css('position', 'absolute');
        menuEl.hide();

        $compile(menuEl)(menuScope);

        element.on('keyup', function(e) {
          var searchParams = {}
          searchParams[attrs.searchParam] = angular.element(this).val();
          $scope['service'].getList(searchParams).then(function (results) {

            menuScope.items = results;

            if (menuHidden) {
              showMenu();
            }
          });
        });

        function showMenu() {
          var offset = element.offset();
          offset.top += element.outerHeight();
          offset.minWidth = element.outerWidth();

          angular.forEach(offset, function (value, key) {
            if (!isNaN(value) && angular.isNumber(value)) {
              value = value + "px"
            }
            menuEl[0].style[key] = value;
            menuEl.css('z-index', 1000);
            menuEl.show();
          });
        }

        function hideMenu() {
          menuEl.hide();
        }
      },
      template: '<input type="text" />'
    };
  });
