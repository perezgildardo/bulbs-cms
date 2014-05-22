'use strict';

angular.module('bulbsCmsApp')
  .directive('onionEditor', function (routes) {

    /* Gab configuration out of .  */


    return {
      require: 'ngModel',
      replace: true,
      restrict: 'E',
      templateUrl: routes.PARTIALS_URL + 'editor.html',
      link: function(scope, element, attrs, ngModel) {

        
        if (!ngModel) {
            return;
        }
        ngModel.$render = function() {
          editor.setContent(ngModel.$viewValue || '');
        }
        // Write data to the model
        function read() {
          var html = editor.getContent(); 
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          ngModel.$setViewValue(html);
        }

        // Set up onion editor stuff

        var editor = new OnionEditor($(".editor", element)[0], {
          content: ngModel.$viewValue,
          role: attrs.role
        });
        scope.$watch(ngModel, function() {
            editor.setContent(ngModel.$viewValue);
        });
      }
    };
  });