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

        var isMenuAppended = false;
        var inputEl = element.find('input');
        var timeoutId = null;

        ngModel.$render = function() {
          if (ngModel.$modelValue) {
            var viewValue = ngModel.$modelValue[attrs.labelAttr];
            if (typeof(viewValue) === "function") {
              viewValue = viewValue();
            }
            element.find('input').val(viewValue);
            inputEl.attr('disabled', 'disabled');
          }
        }

        element.find('button').on('click', function(event) {
          appendMenu();
          inputEl.removeAttr('disabled');
          inputEl[0].focus();
        });

        inputEl.on('blur keyup change', function() {
          if (isMenuAppended === false) {
            return;
          }
          var value = inputEl.val();
          if (value) {
            if (timeoutId) {
              $timeout.cancel(timeoutId);
            }
            timeoutId = $timeout(function(){ queryData(value)}, 250);
          }
        });

        var menuScope = $scope.$new();
        menuScope.items = [];
        menuScope.index = 0;
        menuScope.select = function(index) {
          console.log(menuScope.items[index]);
          ngModel.$modelValue = menuScope.items[index];
          reset();
        }

        var menuEl = angular.element(document.createElement('autocomplete-menu'));
        menuEl.attr({
          'items': 'items',
          'select': 'select(index)',
          'index': 'index'
        });
        transclude(menuScope, function(clone){ menuEl.append(clone) });
        $compile(menuEl)(menuScope);

        // element.parent().append(menuEl);
        // menuEl.hide();

        element.find('input').on('keydown', function(e) {
          switch(e.which) {
            case 27: // ESC
              reset();
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
                reset();
              }
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
            timeoutId = null;
          });
        }

        function appendMenu() {
          if (!isMenuAppended) {
            isMenuAppended = true;
            $animate.enter(menuEl, element.parent(), element);
          }
          showMenu();
        }

        function reset() {
          ngModel.$render();
          menuScope.items = [];
          menuScope.index = 0;
          $animate.leave(menuEl, function() {
            isMenuAppended = false;
          });
        }

        function showMenu() {
          var parentStyles = window.getComputedStyle(element[0]);
          var offset = element.offset();

          offset.left = 'auto';
          offset.right = 'auto';
          offset.top = element.outerHeight();
          offset.minWidth = element.outerWidth();
          menuScope.index = 0;

          angular.forEach(offset, function (value, key) {
            if (!isNaN(value) && angular.isNumber(value)) {
              value = value + "px"
            }
            menuEl[0].style[key] = value;
            menuEl.css('z-index', 1000);
          });
        }

        function hideMenu() {
        }
      },
      templateUrl: routes.PARTIALS_URL + 'autocomplete.html'
    };
  });
