'use strict';

angular.module('customSearch.service.query.factory', [
  'customSearch.settings',
  'customSearch.service.condition.factory'
])
  .factory('CustomSearchServiceQuery', function (_, $q, ContentFactory,
      CustomSearchServiceCondition, CUSTOM_SEARCH_TIME_PERIODS) {

    var CustomSearchServiceQuery = function (params) {
      this.conditions = [];
      this.result_count = 0;
      this.time_period = null;

      this._countEndpoint = ContentFactory.service('custom-search-content/count/');
    };

    CustomSearchServiceQuery.prototype.asQueryData = function () {
      return {
        conditions: _.map(this.conditions, function (condition) {
          return condition.asQueryData();
        }),
        time_period: this.time_period ? this.time_period : null
      };
    };

    CustomSearchServiceQuery.prototype.$updateResultCount = function () {
      var self = this;

      return self._countEndpoint.post(self.asQueryData())
        .then(function (data) {
          self.result_count = data.count;
          return data.count;
        });
    };

    CustomSearchServiceQuery.prototype.addTimePeriod = function () {
      this.time_period = CUSTOM_SEARCH_TIME_PERIODS[0].value;
      return this.time_period;
    };

    CustomSearchServiceQuery.prototype.removeTimePeriod = function () {
      this.time_period = null;
    };

    CustomSearchServiceQuery.prototype.newCondition = function () {
      var newCondition = new CustomSearchServiceCondition();
      this.conditions.push(newCondition);
      return newCondition;
    };

    CustomSearchServiceQuery.prototype.removeCondition = function (index) {
      return this.conditions.splice(index, 1).length > 0;
    };

    return CustomSearchServiceQuery;
  });
