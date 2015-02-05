'use strict';

describe('Factory: SavedSearchServiceQuery', function () {
  var
    SavedSearchServiceQuery,
    SavedSearchServiceCondition;

  beforeEach(function () {
    module('lodash');
    module('savedSearch.service.query.factory');

    inject(function (_SavedSearchServiceQuery_, _SavedSearchServiceCondition_) {
      SavedSearchServiceCondition = _SavedSearchServiceCondition_;
      SavedSearchServiceQuery = _SavedSearchServiceQuery_;
    });
  });

  it('should provide functionality to add a new condition', function () {
    var savedSearchServiceQuery = new SavedSearchServiceQuery();

    var condition = savedSearchServiceQuery.newCondition();

    var conditionInList = savedSearchServiceQuery._conditions[0];
    expect(conditionInList instanceof SavedSearchServiceCondition).toBe(true);
    expect(conditionInList).toEqual(condition);
  });

  it('should provide functionality to retrieve a condition', function () {
    var savedSearchServiceQuery = new SavedSearchServiceQuery();
    var objToRetrieve = {'something': 123};

    savedSearchServiceQuery._conditions.push(objToRetrieve);

    var condition = savedSearchServiceQuery.getCondition(0);
    expect(condition).toEqual(objToRetrieve);
  });

  it('should provide functionality to remove a condition', function () {
    var savedSearchServiceQuery = new SavedSearchServiceQuery();
    var objToRemove = {'something': 123};

    savedSearchServiceQuery._conditions.push(objToRemove);
    savedSearchServiceQuery._conditions.push({});

    var removed = savedSearchServiceQuery.removeCondition(0);

    var conditions = savedSearchServiceQuery._conditions;
    expect(conditions.length).toBe(1);
    expect(conditions[0]).not.toEqual(objToRemove);
    expect(removed).toBe(true);
  });

  it('should provide a function to get the current query count', function () {
    var savedSearchServiceQuery = new SavedSearchServiceQuery();
    var resultCount = 10;

    savedSearchServiceQuery._resultCount = resultCount;

    var resultCountFromService = savedSearchServiceQuery.getResultCount();

    expect(resultCountFromService).toBe(resultCount);
  });

  it('should provide a way to update itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
