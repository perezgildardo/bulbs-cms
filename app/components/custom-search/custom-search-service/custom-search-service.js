'use strict';

angular.module('customSearch.service', [
  'customSearch.service.query.factory'
])
  .factory('CustomSearchService', function (_, $q, ContentFactory, CustomSearchServiceQuery) {

    /**
     * Create custom search service.
     *
     * @returns service wrapper around given endpoint.
     */
    var CustomSearchService = function () {
      this.groups = [];
      this.included_ids = [];
      this.excluded_ids = [];
      this.pinned_ids = [];

      this._content = {};
      this._contentEndpoint = ContentFactory.service('custom-search-content/');
    };

    CustomSearchService.prototype.asQueryData = function () {
      return {
        groups: _.map(this.groups, function (group) {
          return group.asQueryData();
        }),
        included_ids: this.included_ids,
        excluded_ids: this.excluded_ids,
        pinned_ids: this.pinned_ids
      };
    };

    CustomSearchService.prototype.$queryBinding = function () {
      return this._query;
    };

    CustomSearchService.prototype.newQuery = function () {
      var newQuery = new CustomSearchServiceQuery();
      this.groups.push(newQuery);
      return newQuery;
    };

    CustomSearchService.prototype.removeQuery = function (index) {
      return this.groups.splice(index, 1).length > 0;
    };

    CustomSearchService.prototype.clearAllQueries = function () {
      this.groups = [];
    };

    // CustomSearchService.prototype._$getContent = function () {
    //   return this._contentEndpoint.post(this.asQueryData())
    //     .then(function (data) {
    //       this._content = data;
    //     });
    // };

// TODO : PUT THIS SOMEWHERE ELSE
    // CustomSearchService.prototype.$filterContentByIncluded = function () {
    //   var contentQuery = _.pick(this._query, 'included_ids');
    //   return this._$getContent(contentQuery);
    // };
    //
    // CustomSearchService.prototype.$filterContentByExcluded = function () {
    //   var contentQuery = _.pick(this._query, 'excluded_ids');
    //   return this._$getContent(contentQuery);
    // };
    //
    // CustomSearchService.prototype.$updateContent = function (page, searchTerm) {
    //   var contentQuery =
    //     _.chain(this._query).cloneDeep()
    //       .assign({
    //         page: page,
    //         searchTerm: searchTerm
    //       })
    //       .value();
    //   return this._$getContent(contentQuery);
    // };
    //
    // CustomSearchService.prototype.include = function (id) {
    //   // add id, ensure uniqueness
    //   this._query.included_ids.push(id);
    //   this._query.included_ids = _.uniq(this._query.included_ids);
    //
    //   // remove from exclude list
    //   this.unexclude(id);
    // };
    //
    // CustomSearchService.prototype.uninclude = function (id) {
    //   this._query.included_ids = _.without(this._query.included_ids, id);
    // };
    //
    // CustomSearchService.prototype.exclude = function (id) {
    //   // exclude id, ensure unqiueness
    //   this._query.excluded_ids.push(id);
    //   this._query.excluded_ids = _.uniq(this._query.excluded_ids);
    //
    //   // remove from include list and pinned list
    //   this.uninclude(id);
    //   this.unpin(id);
    // };
    //
    // CustomSearchService.prototype.unexclude = function (id) {
    //   this._query.excluded_ids = _.without(this._query.excluded_ids, id);
    // };
    //
    // CustomSearchService.prototype.pin = function (id) {
    //   // pin id, ensure unqiueness
    //   this._query.pinned_ids.push(id);
    //   this._query.pinned_ids = _.uniq(this._query.pinned_ids);
    //
    //   // remove from exclude list
    //   this.unexclude(id);
    // };
    //
    // CustomSearchService.prototype.unpin = function (id) {
    //   this._query.pinned_ids = _.without(this._query.pinned_ids, id);
    // };

    return CustomSearchService;
  });
