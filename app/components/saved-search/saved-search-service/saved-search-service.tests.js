'use strict';

describe('Service: SavedSearchService', function () {
  var
    SavedSearchService,
    SavedSearchServiceQuery;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('savedSearch.service');

    inject(function (_SavedSearchService_, _SavedSearchServiceQuery_) {
      SavedSearchService = _SavedSearchService_;
      SavedSearchServiceQuery = _SavedSearchServiceQuery_;
    });
  });

  it('should provide functionality to execute a search', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  describe('query functionality', function () {

    it('should provide a function to add a new query', function () {
      SavedSearchService.newQuery();
      expect(SavedSearchService._query.groups[0] instanceof SavedSearchServiceQuery).toBe(true);
      expect(SavedSearchService._content.group_counts.length).toBe(1);
    });

    it('should provide a function to remove a query', function () {
      var objToRemove = {'something': 123};

      SavedSearchService._query.groups.push(objToRemove, {});
      SavedSearchService._content.group_counts.push(0, 0);

      var removed = SavedSearchService.removeQuery(0);

      expect(SavedSearchService._query.groups.length).toBe(1);
      expect(SavedSearchService._query.groups[0]).not.toEqual(objToRemove);
      expect(removed).toBe(true);
      expect(SavedSearchService._content.group_counts.length).toBe(1);
    });

    it('should return false from remove query function if query was not removed successfully', function () {
      SavedSearchService._query.groups = [];

      var removed = SavedSearchService.removeQuery(10);

      expect(removed).toBe(false);
      expect(SavedSearchService._query.groups.length).toBe(0);
    });

    it('should provide a function to retrieve a query', function () {
      var objToRetrieve = {'something': 123};

      SavedSearchService._query.groups.push(objToRetrieve);

      var retrieved = SavedSearchService.getQuery(0);

      expect(retrieved).toEqual(objToRetrieve);
    });

    it('should provide a function to retreive queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      SavedSearchService._query.groups.push(item1, item2);

      var queries = SavedSearchService.getQueries();

      expect(queries[0]).toEqual(item1);
      expect(queries[1]).toEqual(item2);
    });

    it('should provide a function to clear all queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      SavedSearchService._query.groups.push(item1, item2);

      SavedSearchService.clearQueries();

      expect(SavedSearchService._query.groups.length).toBe(0);
    });
  });

  describe('content list functionality', function () {

    it('should provide a function to access the current content list', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      SavedSearchService._content.items.push(item1, item2);

      var content = SavedSearchService.getContentItems();

      expect(content[0]).toEqual(item1);
      expect(content[1]).toEqual(item2);
    });

    it('should ensure content list is ordered by pins, then by published date', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });
  });
});
