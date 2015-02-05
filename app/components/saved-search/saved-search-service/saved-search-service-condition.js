'use strict';

angular.module('savedSearch.service.condition.factory', [])
  .factory('SavedSearchServiceCondition', function (_) {

    var SavedSearchServiceCondition = function (params) {
      this.field = _.result(params, 'field', '');
      this.type = _.result(params, 'type', '');
      this.values = _.result(params, 'values', []);
    };

    return SavedSearchServiceCondition;
  });
