'use strict';

angular.module('bulbsCmsApp')
  .directive('autocomplete', function ($timeout, $animate, $compile, routes) {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      transclude: true,
      controller: function ($scope, $element, $attrs, $injector) {
        $scope.service = $injector.get($attrs.service);
      },
      link: function ($scope, element, attrs, ngModel, transclude) {

        ngModel.$render = function() {
          if (ngModel.$modelValue) {
            var viewValue = ngModel.$modelValue[attrs.labelAttr];
            if (typeof(viewValue) === "function") {
              viewValue = viewValue();
            }
            element.val(viewValue);
          }
        }

        if(attrs.labelAttr) {
          ngModel.$formatters.push(function () {
            if (ngModel.$modelValue !== undefined) {
              var viewValue = ngModel.$modelValue[attrs.labelAttr];
              if (typeof(viewValue) === "function") {
                return viewValue();
              } else {
                return viewValue;
              }
            }
          });
        }

        // if (ngModel.$modelValue !== null) {
        //   element.attr('disabled', 'disabled')
        // }

        var menuHidden = true;
        var timeoutId = null;

        ngModel.$parsers.push(function (value){
          if (value) {
            if (timeoutId) {
              $timeout.cancel(timeoutId);
            }
            timeoutId = $timeout(function(){ queryData(value)}, 250);
          }
          return undefined;
        });

        var menuScope = $scope.$new();
        menuScope.items = [];
        menuScope.index = 0;
        menuScope.select = function(index) {
          ngModel.$setViewValue(menuScope.items[index]);
          ngModel.$render();
          hideMenu();
        }

        var menuEl = angular.element(document.createElement('autocomplete-menu'));
        menuEl.attr({
          'items': 'items',
          'select': 'select(index)',
          'index': 'index'
        });
        transclude(menuScope, function(clone){
          menuEl.append(clone);
        });
        var retVal = $compile(menuEl)(menuScope);

        angular.element('body').append(menuEl);
        menuEl.hide();

        element.on('keydown', function(e) {
          switch(e.which) {
            case 27: // ESC
              hideMenu();
              break;
            case 40: // DOWN
              $scope.$apply(function() {
                menuScope.index = (menuScope.index + 1) % menuScope.items.length
              });
              break;
            case 38: // UP
              $scope.$apply(function() {
                if(menuScope.index) {
                  menuScope.index = menuScope.index - 1;
                } else {
                  menuScope.index = menuScope.items.length - 1;
                }
              });
              break;
            case 13: // RETURN
              if (menuScope.index) {
                ngModel.$modelValue = menuScope.items[menuScope.index];
                ngModel.$render();
              }
              hideMenu();
              break;
            default:
              return;

            return e.preventDefault();
          }
        });

        function queryData(query) {
          var searchParams = {}
          searchParams[attrs.searchParam] = query;
          $scope['service'].getList(searchParams).then(function (results) {

            menuScope.items = results;

            if (menuHidden) {
              showMenu();
            }
            timeoutId = null;
          });
        }

        function showMenu() {
          var offset = element.offset();
          offset.top += element.outerHeight();
          offset.minWidth = element.outerWidth();
          menuHidden = false;
          menuScope.index = 0;

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
          menuHidden = true;
        }
      },
      template: '<input class="autocomplete-select" type="text" />'
    };
  });
