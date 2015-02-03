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
    SavedSearchService.newQuery();

    expect(SavedSearchService._serviceData.groups[0] instanceof SavedSearchServiceQuery).toBe(true);
  });

  describe('query functionality', function () {

    it('should provide a function to add a new query', function () {


// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to remove a query', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to add a condition to a query', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to remove a condition from a query', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to retreive queries', function () {
    // TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to clear all queries', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });
  });

  describe('content list functionality', function () {

    it('should provide a function to access the current content list', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to manually add content to the content list', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to manually remove content from the content list', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should provide a function to pin content to the top of the content list', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });

    it('should ensure content list is ordered by pins, then by published date', function () {
// TODO : fill this in
      throw 'Not implemented yet.';
    });
  });
});
