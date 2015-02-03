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

    savedSearchServiceQuery.newCondition();

    expect(savedSearchServiceQuery.conditions[0] instanceof SavedSearchServiceCondition).toBe(true);
  });
});
