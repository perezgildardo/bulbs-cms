'use strict';

describe('Service: CustomSearchService', function () {
  var
    $httpBackend,
    $rootScope,
    moment,
    customSearchService;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('customSearch.service');

    inject(function (_$httpBackend_, _$rootScope_, _moment_, CustomSearchService) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      moment = _moment_;
      customSearchService = new CustomSearchService();
    });
  });

  it('should provide functionality to execute a search', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  describe('query functionality', function () {

    it('should be able to add a new query', function () {
      var newQuery = customSearchService.newQuery();
      expect(customSearchService._query.groups.length).toBe(1);
      expect(customSearchService._query.groups[0]).toBe(newQuery);
    });

    it('should be able to remove a query', function () {
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

    it('should be able to retreive queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      customSearchService._query.groups.push(item1, item2);

      var queries = customSearchService.getQueries();

      expect(queries[0]).toEqual(item1);
      expect(queries[1]).toEqual(item2);
    });

    it('should be able to clear all queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      customSearchService._query.groups.push(item1, item2);

      customSearchService.clearQueries();

      expect(customSearchService._query.groups.length).toBe(0);
    });

    it('should be able to retrieve the content count for a query', function () {
      var count = 5;

      customSearchService.newQuery();
      customSearchService.$updateQueryCount(0);

      $httpBackend.expectPOST('/cms/api/v1/custom-search-content/count/').respond(200, {count: count});
      $httpBackend.flush();

      expect(customSearchService._query.groups[0].result_count).toBe(count);
    });

    it('should not allow a content count update if query index is nonexistent', function () {
      var rejected = false;
      customSearchService.$updateQueryCount(10)
        .catch(function () {
          rejected = true;
        });

      $rootScope.$digest();

      expect(rejected).toBe(true);
    });
  });

  describe('query condition functionality', function () {

    it('should be able to add a condition to a query', function () {
      customSearchService.newQuery();

      var newCondition = customSearchService.newCondition(0);

      expect(customSearchService._query.groups[0].conditions[0]).toBe(newCondition);
    });

    it('should return undefined when attempting to add a condition to a non-existant query', function () {
      var newCondition = customSearchService.newCondition(0);

      expect(newCondition).toBeUndefined();
    });

    it('should be able to remove a condition from a query', function () {
      customSearchService.newQuery();
      customSearchService.newCondition(0);

      var removed = customSearchService.removeCondition(0, 0);

      expect(customSearchService._query.groups[0].conditions.length).toBe(0);
      expect(removed).toBe(true);
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
