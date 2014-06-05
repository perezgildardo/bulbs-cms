'use strict';

angular.module('bulbsCmsApp')
  .directive('onionEditor', function (routes, $, EDITOR_INLINE_OPTIONS) {

    /* Gab configuration out of .  */

    return {
      require: 'ngModel',
      replace: true,
      restrict: 'E',
      templateUrl: routes.PARTIALS_URL + 'editor.html',
      scope: {ngModel:'='},
      link: function(scope, element, attrs, ngModel) {

        if (!ngModel) {
            return;
        }

        if (attrs.role == "multiline") {
          var defaultValue = "<p><br></p>";
          var options = {
            /* global options */
            element: element[0],
            onContentChange: read,
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
            onContentChange: read,
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

        ngModel.$render = function() {
          editor.setContent(ngModel.$viewValue || defaultValue);
        }
        // Write data to the model
        function read() {
          var html = editor.getContent(); 
          console.log("READING", html);
          ngModel.$setViewValue(html);
        }

        scope.$watch(ngModel, function() {
          editor.setContent(ngModel.$viewValue || defaultValue);
        });
      }
    };
  });