'use strict';

angular.module('customSearch.service.condition.factory', [
  'customSearch.settings'
])
  .factory('CustomSearchServiceCondition', function (_, CUSTOM_SEARCH_CONDITION_FIELDS,
      CUSTOM_SEARCH_CONDITION_TYPES) {

    var CustomSearchServiceCondition = function () {
      this.field = CUSTOM_SEARCH_CONDITION_FIELDS[0].endpoint;
      this.type = CUSTOM_SEARCH_CONDITION_TYPES[0].value;
      this.values = [];
    };

    CustomSearchServiceCondition.prototype.asQueryData = function () {
      return _.pick(this, ['field', 'type', 'values'])
    };

    CustomSearchServiceCondition.prototype.addValue = function (value) {
      if (!_.isUndefined(value) && !_.includes(this.values, value)) {
        this.values.push(value);
      }
    };

    CustomSearchServiceCondition.prototype.removeValue = function (index) {
      return this.values.splice(index, 1).length > 0;
    };

    return CustomSearchServiceCondition;
  });
