'use strict';

angular.module('savedSearch.service.condition.factory', [])
  .factory('SavedSearchServiceCondition', function (_) {

    var SavedSearchServiceCondition = function (params) {
      return _.defaults(this, {
        fields: '',
        type: '',
        values: []
      });
    };

    return SavedSearchServiceCondition;
  });
