'use strict';

angular.module('savedSearch.service', [
  'savedSearch.service.content.factory',
  'savedSearch.service.query.factory'
])
  .service('SavedSearchService', function (SavedSearchServiceQuery) {
    var SavedSearchService = this;

    SavedSearchService._query = {
      groups: [],
      included_ids: [],
      excluded_ids: [],
      pinned_ids: [],
      time: ''
    };

    SavedSearchService._content = {
      group_counts: [],
      items: [],
      total: 0
    };

    /**
     * Add a new query object to service.
     *
     * @returns newly created query object.
     */
    SavedSearchService.newQuery = function () {
      var query = new SavedSearchServiceQuery();
      SavedSearchService._query.groups.push(query);
      SavedSearchService._content.group_counts.push(0);
      return query;
    };

    /**
     * Retrieve a {@link SavedSearchServiceQuery} at given index.
     *
     * @param {Number} index - index of item to retrieve.
     * @returns {SavedSearchServiceQuery|undefined} item if one exists at given
     *  index, undefined otherwise.
     */
    SavedSearchService.getQuery = function (index) {
      return SavedSearchService._query.groups[index];
    };

    /**
     * Remove a query based on given index;
     *
     * @param {Number} index - index of item to remove.
     * @returns {Boolean} true if item was removed, false otherwise.
     */
    SavedSearchService.removeQuery = function (index) {
      var spliced = SavedSearchService._query.groups.splice(index, 1);

      var spliceWorked = spliced.length > 0;
      if (spliceWorked) {
        // remove corresponding count for this group
        SavedSearchService._content.group_counts.splice(index, 1);
      }

      return spliceWorked;
    };

    /**
     * Retrieve all queries stored in service.
     *
     * @returns {SavedSearchServiceQuery[]} stored list of {@link SavedSearchServiceQuery} items.
     */
    SavedSearchService.getQueries = function () {
      return SavedSearchService._query.groups;
    };

    /**
     * Clear all queries.
     */
    SavedSearchService.clearQueries = function () {
      SavedSearchService._query.groups = [];
    };

  });
