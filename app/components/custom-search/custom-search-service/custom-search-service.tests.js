'use strict';

describe('Service: CustomSearchService', function () {
  var
    $httpBackend,
    moment,
    customSearchService;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('customSearch.service');

    inject(function (_$httpBackend_, _moment_, CustomSearchService) {
      $httpBackend = _$httpBackend_;
      moment = _moment_;
      customSearchService = new CustomSearchService();
    });
  });

  it('should provide functionality to execute a search', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  describe('query functionality', function () {

    it('should provide a function to add a new query', function () {
      customSearchService.newQuery();
      expect(customSearchService._query.groups.length).toBe(1);
    });

    it('should provide a function to remove a query', function () {
      var objToRemove = {'something': 123};

      customSearchService._query.groups.push(objToRemove, {});

      var removed = customSearchService.removeQuery(0);

      expect(customSearchService._query.groups.length).toBe(1);
      expect(customSearchService._query.groups[0]).not.toEqual(objToRemove);
      expect(removed).toBe(true);
    });

    it('should return false from remove query function if query was not removed successfully', function () {
      customSearchService._query.groups = [];

      var removed = customSearchService.removeQuery(10);

      expect(removed).toBe(false);
      expect(customSearchService._query.groups.length).toBe(0);
    });

    it('should provide a function to retreive queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      customSearchService._query.groups.push(item1, item2);

      var queries = customSearchService.getQueries();

      expect(queries[0]).toEqual(item1);
      expect(queries[1]).toEqual(item2);
    });

    it('should provide a function to clear all queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      customSearchService._query.groups.push(item1, item2);

      customSearchService.clearQueries();

      expect(customSearchService._query.groups.length).toBe(0);
    });

    it('should provide a function to retrieve the content count for a query', function () {
      var count = 5;

      customSearchService.newQuery();
      customSearchService.$updateQueryCount(0);

      $httpBackend.expectPOST('/cms/api/v1/custom-search-contnt/count/').respond(200, {count: count});
      $httpBackend.flush();

    // TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should not allow a content count update if query index is nonexistent', function () {

    // TODO : fill this in
      throw 'Not implemented yet.';
    });
  });

  describe('content list functionality', function () {

    it('should provide a function to access the current content list', function () {
// TODO : implement this
      throw 'Not implemented yet';
    });

    it('should ensure content list is ordered by pins, then by published date', function () {
// TODO : implement this
      throw 'Not implemented yet';

    });
  });
});
