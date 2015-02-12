'use strict';

describe('Service: CustomSearchService', function () {
  var
    _,
    $httpBackend,
    $rootScope,
    moment,
    CustomSearchServiceQuery,
    customSearchService;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('customSearch.service');

    inject(function (___, _$httpBackend_, _$rootScope_, _CustomSearchServiceQuery_,
          _moment_, CustomSearchService) {
      _ = ___;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      CustomSearchServiceQuery = _CustomSearchServiceQuery_;
      moment = _moment_;
      customSearchService = new CustomSearchService();
    });
  });

  it('should be able to summarize itself as query data', function () {
    var query = {
      asQueryData: function () {}
    };

    spyOn(query, 'asQueryData');

    customSearchService.groups.push(query);

    var data = customSearchService.asQueryData();

    expect(query.asQueryData).toHaveBeenCalled();
    expect(_.isArray(data.groups)).toBe(true);
  });

  describe('query functionality', function () {

    it('should be able to add a new query', function () {
      var newQuery = customSearchService.newQuery();

      expect(customSearchService.groups.length).toBe(1);
      expect(customSearchService.groups[0]).toBe(newQuery);
      expect(newQuery instanceof CustomSearchServiceQuery).toBe(true);
    });

    it('should be able to remove a query', function () {
      var objToRemove = {'something': 123};

      customSearchService.groups.push(objToRemove, {});

      var removed = customSearchService.removeQuery(0);

      expect(customSearchService.groups.length).toBe(1);
      expect(customSearchService.groups[0]).not.toEqual(objToRemove);
      expect(removed).toBe(true);
    });

    it('should return false from remove query function if query was not removed successfully', function () {
      customSearchService.groups = [];

      var removed = customSearchService.removeQuery(10);

      expect(removed).toBe(false);
      expect(customSearchService.groups.length).toBe(0);
    });

    it('should be able to clear all queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      customSearchService.groups.push(item1, item2);

      customSearchService.clearAllQueries();

      expect(customSearchService.groups.length).toBe(0);
    });
  });

  describe('content list functionality', function () {

    it('should provide functionality to execute a search', function () {
  // TODO : fill this in
      throw 'Not implemented yet.';
    });

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
