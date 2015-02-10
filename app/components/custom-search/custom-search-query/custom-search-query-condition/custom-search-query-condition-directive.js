'use strict';

angular.module('customSearch.query.condition.directive', [
  'customSearch.settings',
  'customSearch.service.condition.factory',
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest'
])
  .directive('customSearchQueryCondition', function (routes) {
    return {
      controller: function (_, $q, $scope, BULBS_AUTOCOMPLETE_EVENT_KEYPRESS,
          BulbsAutocomplete, CUSTOM_SEARCH_CONDITION_FIELDS, CUSTOM_SEARCH_CONDITION_TYPES,
          CUSTOM_SEARCH_TIME_PERIODS) {

        $scope.conditionTypes = CUSTOM_SEARCH_CONDITION_TYPES;
        $scope.timePeriods = CUSTOM_SEARCH_TIME_PERIODS;
        $scope.fieldTypes = CUSTOM_SEARCH_CONDITION_FIELDS;

        $scope.searchTerm = '';
        $scope.autocompleteItems = [];

        var getAutocompleteItems = function () {
          var defer = $q.defer();

          if ($scope.searchTerm) {
            defer.resolve([{
              name: 'item1',
              value: 10
            }, {
              name: 'item11',
              value: 20
            }, {
              name: 'item21',
              value: 30
            }, {
              name: 'item31',
              value: 40
            }, {
              name: 'item41',
              value: 50
            }, {
              name: 'item51',
              value: 60
            }, {
              name: 'item61',
              value: 70
            }]);
          } else {
            defer.resolve([]);
          }

          return defer.promise;
        };

        var autocomplete = new BulbsAutocomplete(getAutocompleteItems);

        $scope.suggestFormatter = function (item) {
          return item.name + ' - ' + item.value;
        };

        $scope.addValue = function (item) {
          $scope.model.addValue(item);
        };

        $scope.updateAutocomplete = function () {
          autocomplete.$retrieve().then(function (results) {
            $scope.autocompleteItems = results;
          });
        };

        $scope.handleKeypress = function ($event) {
          $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, $event);
        };
      },
      restrict: 'E',
      scope: {
        remove: '&',
        model: '='
      },
      templateUrl: routes.COMPONENTS_URL + 'custom-search/custom-search-query/custom-search-query-condition/custom-search-query-condition.html'
    };
  });
