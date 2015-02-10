'use strict';

angular.module('customSearch.service', [])
  .factory('CustomSearchService', function (_, $q, ContentFactory) {

// TODO : make time periods customizable
    var timePeriods = {
      NONE: '',
      ONE_DAY: '1 day'
    };
    var conditionTypes = {
      NONE_OF: 'none',
      ALL_OF: 'all',
      ANY_OF: 'any'
    };

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

    var CustomSearchService.prototype._$getContent = function (contentQuery) {
      return this._contentEndpoint.post(contentQuery)
        .then(function (data) {
          this._content = data;
        });
    };

    CustomSearchService.prototype.newCondition = function (index) {
      this._query.groups[index].conditions.push({
        field: '',
        type: conditionTypes.ANY_OF,
        values: []
      });
    };

    CustomSearchService.prototype.removeCondition = function (queryIndex, conditionIndex) {
      var spliced = this._query
        .groups[queryIndex]
        .conditions.splice(conditionIndex, 1);
      return spliced.length > 0;
    };

    CustomSearchService.prototype.newQuery = function () {
      this._query.groups.push({
        conditions: [],
        time: timePeriods.NONE
      });
    };

    CustomSearchService.prototype.removeQuery = function (index) {
      var spliced = this._query.groups.splice(index, 1);
      return spliced.length > 0;
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

    CustomSearchService.prototype.$updateQueryCount = function (index) {
      return (function (index) {
        // wrap to maintain index value for this call after async completes
        var defer = $q.defer();

        if (index < self._query.groups.length) {
          var self = this;
          var oneGroupQuery = _.clone(self._query);

          oneGroupQuery.groups = _.pullAt(oneGroupQuery.groups, index);
          this._queryCountEndpoint.post(oneGroupQuery)
            .then(function (data) {
              if (index < self._query.groups.length) {
                self._query.groups[index].resultCount = data.count;
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
