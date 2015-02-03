'use strict';

angular.module('savedSearch.service.query.factory', [
  'savedSearch.service.condition.factory'
])
  .factory('SavedSearchServiceQuery', function (SavedSearchServiceCondition) {

    var SavedSearchServiceQuery = function (params) {
      this.conditions = [];
    };

    SavedSearchServiceQuery.prototype.newCondition = function (params) {
      this.conditions.push(new SavedSearchServiceCondition(params));
    };

    return SavedSearchServiceQuery;
  });
