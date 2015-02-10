'use strict';

describe('Service: CustomSearchService', function () {
  var
    moment,
    CustomSearchService,
    CustomSearchServiceQuery,
    CustomSearchServiceContent;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('savedSearch.service');

    inject(function (_moment_, _CustomSearchService_, _CustomSearchServiceQuery_,
        _CustomSearchServiceContent_) {
      moment = _moment_;
      CustomSearchService = _CustomSearchService_;
      CustomSearchServiceQuery = _CustomSearchServiceQuery_;
      CustomSearchServiceContent = _CustomSearchServiceContent_;
    });
  });

  it('should provide functionality to execute a search', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  describe('query functionality', function () {

    it('should provide a function to add a new query', function () {
      CustomSearchService.newQuery();
      expect(CustomSearchService._query.groups[0] instanceof CustomSearchServiceQuery).toBe(true);
      expect(CustomSearchService._content.group_counts.length).toBe(1);
    });

    it('should provide a function to remove a query', function () {
      var objToRemove = {'something': 123};

      CustomSearchService._query.groups.push(objToRemove, {});
      CustomSearchService._content.group_counts.push(0, 0);

      var removed = CustomSearchService.removeQuery(0);

      expect(CustomSearchService._query.groups.length).toBe(1);
      expect(CustomSearchService._query.groups[0]).not.toEqual(objToRemove);
      expect(removed).toBe(true);
      expect(CustomSearchService._content.group_counts.length).toBe(1);
    });

    it('should return false from remove query function if query was not removed successfully', function () {
      CustomSearchService._query.groups = [];

      var removed = CustomSearchService.removeQuery(10);

      expect(removed).toBe(false);
      expect(CustomSearchService._query.groups.length).toBe(0);
    });

    it('should provide a function to retrieve a query', function () {
      var objToRetrieve = {'something': 123};

      CustomSearchService._query.groups.push(objToRetrieve);

      var retrieved = CustomSearchService.getQuery(0);

      expect(retrieved).toEqual(objToRetrieve);
    });

    it('should provide a function to retreive queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      CustomSearchService._query.groups.push(item1, item2);

      var queries = CustomSearchService.getQueries();

      expect(queries[0]).toEqual(item1);
      expect(queries[1]).toEqual(item2);
    });

    it('should provide a function to clear all queries', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      CustomSearchService._query.groups.push(item1, item2);

      CustomSearchService.clearQueries();

      expect(CustomSearchService._query.groups.length).toBe(0);
    });
  });

  describe('content list functionality', function () {

    it('should provide a function to access the current content list', function () {
      var item1 = {'something': 123};
      var item2 = {'another thing': 456};

      CustomSearchService._content.items.push(item1, item2);

      var content = CustomSearchService.getContentItems();

      expect(content[0]).toEqual(item1);
      expect(content[1]).toEqual(item2);
    });

    it('should ensure content list is ordered by pins, then by published date', function () {
      var contentBottom = new CustomSearchServiceContent({
        id: 1,
        title: 'Would You Survive a Bear Attack?',
        publishDate: moment().subtract(1, 'day').format()
      });
      var contentTop = new CustomSearchServiceContent({
        id: 2,
        title: 'Embarrassing: The U.S. Is Ranked 182nd In The World Alphabetically',
        publishDate: moment().subtract(1, 'month').format(),
        pinned: true
      });
      var contentMiddle = new CustomSearchServiceContent({
        id: 3,
        title: '5 Major Tattoo Fails',
        publishDate: moment().format()
      });

      // TODO : make request here

      content = CustomSearchService.getContentItems();

      throw "Not implemented yet";

    });
  });
});
