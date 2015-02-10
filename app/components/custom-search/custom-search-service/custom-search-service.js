'use strict';

angular.module('customSearch.service', [])
  .value('TIME_PERIODS', {
    NONE: '',
    ONE_DAY: '1 day'
  })
  .value('CONDITION_TYPES', {
    NONE_OF: 'none',
    ALL_OF: 'all',
    ANY_OF: 'any'
  })
  .factory('CustomSearchService', function (_, $q, CONDITION_TYPES, ContentFactory, TIME_PERIODS) {

    /**
     * Create custom search service.
     *
     * @returns service wrapper around given endpoint.
     */
    var CustomSearchService = function () {
      this._query = {
        groups: [],
        included_ids: [],
        excluded_ids: [],
        pinned_ids: []
      };
      this._content = {};
      this._contentEndpoint = ContentFactory.service('custom-search-content/');
      this._queryCountEndpoint = ContentFactory.service('custom-search-content/count/');
    };

    CustomSearchService.prototype._$getContent = function (contentQuery) {
      return this._contentEndpoint.post(contentQuery)
        .then(function (data) {
          this._content = data;
        });
    };

    CustomSearchService.prototype.newQuery = function () {
      var newQuery = {
        conditions: [],
        result_count: 0,
        time: TIME_PERIODS.NONE
      };
      this._query.groups.push(newQuery);
      return newQuery;
    };

    CustomSearchService.prototype.getQueries = function () {
      return this._query.groups;
    };

    CustomSearchService.prototype.removeQuery = function (index) {
      var spliced = this._query.groups.splice(index, 1);
      return spliced.length > 0;
    };

    CustomSearchService.prototype.clearQueries = function () {
      this._query.groups = [];
    };

    CustomSearchService.prototype.$updateQueryCount = function (index) {
      var self = this;

      return (function (index) {
        // wrap to maintain index value for this call after async completes
        var defer = $q.defer();

        if (index < self._query.groups.length) {
          var oneGroupQuery = _.cloneDeep(self._query);

          oneGroupQuery.groups = _.pullAt(oneGroupQuery.groups, index);
          self._queryCountEndpoint.post(oneGroupQuery)
            .then(function (data) {
              if (index < self._query.groups.length) {
                self._query.groups[index].result_count = data.count;
                defer.resolve(data.count);
              } else {
                defer.reject('Group at index ' + index + ' no longer exists!');
              }
            })
            .catch(function (err) {
              defer.reject(err);
            });
        } else {
          defer.reject('Group at index ' + index + ' no longer exists!');
        }

        return defer.promise;
      })(index);
    };

    CustomSearchService.prototype.newCondition = function (index) {
      var newCondition;
      if (index >= 0 && index < this._query.groups.length) {
        newCondition = {
          field: '',
          type: CONDITION_TYPES.ANY_OF,
          values: []
        };
        this._query.groups[index].conditions.push(newCondition);
      }
      return newCondition;
    };

    CustomSearchService.prototype.removeCondition = function (queryIndex, conditionIndex) {
      var spliced = false;
      if (queryIndex >= 0 && queryIndex < this._query.groups.length) {
        var spliced = this._query
          .groups[queryIndex]
          .conditions.splice(conditionIndex, 1);
        spliced = spliced.length > 0;
      }
      return spliced;
    };

    CustomSearchService.prototype.$filterContentByIncluded = function () {
      var contentQuery = _.pick(this._query, 'included_ids');
      return this._$getContent(contentQuery);
    };

    CustomSearchService.prototype.$filterContentByExcluded = function () {
      var contentQuery = _.pick(this._query, 'excluded_ids');
      return this._$getContent(contentQuery);
    };

    CustomSearchService.prototype.$updateContent = function (page, searchTerm) {
      var contentQuery =
        _.chain(this._query).cloneDeep()
          .assign({
            page: page,
            searchTerm: searchTerm
          })
          .value();
      return this._$getContent(contentQuery);
    };

    CustomSearchService.prototype.include = function (id) {
      // add id, ensure uniqueness
      this._query.included_ids.push(id);
      this._query.included_ids = _.uniq(this._query.included_ids);

      // remove from exclude list
      this.unexclude(id);
    };

    CustomSearchService.prototype.uninclude = function (id) {
      this._query.included_ids = _.without(this._query.included_ids, id);
    };

    CustomSearchService.prototype.exclude = function (id) {
      // exclude id, ensure unqiueness
      this._query.excluded_ids.push(id);
      this._query.excluded_ids = _.uniq(this._query.excluded_ids);

      // remove from include list and pinned list
      this.uninclude(id);
      this.unpin(id);
    };

    CustomSearchService.prototype.unexclude = function (id) {
      this._query.excluded_ids = _.without(this._query.excluded_ids, id);
    };

    CustomSearchService.prototype.pin = function (id) {
      // pin id, ensure unqiueness
      this._query.pinned_ids.push(id);
      this._query.pinned_ids = _.uniq(this._query.pinned_ids);

      // remove from exclude list
      this.unexclude(id);
    };

    CustomSearchService.prototype.unpin = function (id) {
      this._query.pinned_ids = _.without(this._query.pinned_ids, id);
    };

    return CustomSearchService;
  });
