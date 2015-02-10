'use strict';

angular.module('customSearch.settings', [])
  .value('CUSTOM_SEARCH_CONDITION_FIELDS', [{
    name: 'Content Type',
    endpoint: 'content-type'
  }, {
    name: 'Feature Type',
    endpoint: 'feature-type'
  }, {
    name: 'Tag',
    endpoint: 'tag'
  }])
  .value('CUSTOM_SEARCH_CONDITION_TYPES', [{
    name: 'is none of',
    value: 'none'
  }, {
    name: 'is all of',
    value: 'all'
  }, {
    name: 'is any of',
    value: 'any'
  }])
  .value('CUSTOM_SEARCH_TIME_PERIODS', [{
    name: 'Past Day',
    value: '1 day'
  }, {
    name: 'Past Week',
    value: '1 week'
  }])
  .value('CUSTOM_SEARCH_CONDITION_FIELD_TIME_PERIOD', {
    name: 'Time Period',
    endpoint: 'time-period'
  });
