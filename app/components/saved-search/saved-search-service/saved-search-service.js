'use strict';

angular.module('savedSearch.service', [
  'savedSearch.service.query.factory'
])
  .service('SavedSearchService', function (SavedSearchServiceQuery) {
    var SavedSearchService = this;

    SavedSearchService._serviceData = {
      groups: [],
      included_ids: [],
      excluded_ids: [],
      pinned_ids: [],
      time: ''
    };
    var _data = SavedSearchService._serviceData;

    /**
     * Add a new query object to service.
     *
     * @returns newly created query object.
     */
    SavedSearchService.newQuery = function () {
      var query = new SavedSearchServiceQuery();
      _data.groups.push(query);
      return query;
    };

  });
