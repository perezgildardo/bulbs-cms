'use strict';

angular.module('bulbsCmsApp')
  .directive('onionEditor', function (routes, $, EDITOR_INLINE_OPTIONS) {

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
        if (attrs.role == "multiline") {
          var defaultValue = "<p><br></p>";
          var options = {
            /* global options */
            element: element[0],
            toolbar: {
              linkTools: $("#link-tools-template").html()
            },
            undoManager: new UndoManager(),
            placeholder: "Write here",
            editSource: true,
            // NOT SURE WHAT TO DO ABOUT THIS....
            avlink: {
              thingsUrl: "/cms/api/v1/things/",
              contentUrl:"/cms/api/v1/content/",
              host: "avclub.com"
            },
            statsContainer: ".wordcount",
            /* This probably deserves its own file */
            inline: EDITOR_INLINE_OPTIONS
          }
        }
        else {
          $(".document-tools, .embed-tools", element).hide();
          var defaultValue = "";
          var options = {
            /* global options */
            element: element[0],
            placeholder: "Type your Headline",
            allowNewline: false,
            allowNbsp: false,
            characterLimit: 200,
            sanitize: {
              elements: ['i', 'em'],
              remove_contents: ['script', 'style', ],
            }
          }
        }

        var editor = new Editor(options);
        scope.$watch(ngModel, function() {
          editor.setContent(ngModel.$viewValue || defaultValue);
        });
      }
    };
  });