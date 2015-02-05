'use strict';

describe('Factory: SavedSearchServiceContent', function () {
  var content;

  beforeEach(function () {
    module('lodash');
    module('savedSearch.service.content.factory');

    inject(function (_SavedSearchServiceContent_) {
      var SavedSearchServiceContent = _SavedSearchServiceContent_;

      content = new SavedSearchServiceContent({id: 1, title: 'some title'});
    });
  });

  it('should provide a function to mark itself as manually added and check that it\'s manually added', function () {
    content.markManuallyAdded();

    expect(content.isManuallyAdded()).toBe(true);
    expect(content.isManuallyRemoved()).toBe(false);
    expect(content.isNormalResult()).toBe(false);
  });

  it('should provide a function to mark itself as manually removed', function () {
    content.markManuallyRemoved();

    expect(content.isManuallyRemoved()).toBe(true);
    expect(content.isManuallyAdded()).toBe(false);
    expect(content.isNormalResult()).toBe(false);
  });

  it('should provide a function to mark itself as a normal result', function () {
    content.markNormalResult();

    expect(content.isNormalResult()).toBe(true);
    expect(content.isManuallyRemoved()).toBe(false);
    expect(content.isManuallyAdded()).toBe(false);
  });

  it('should provide a function to pin itself', function () {
    content.pin();

    expect(content.isPinned()).toBe(true);
  });

  it('should provide a function to unpin itself', function () {
    content.unpin();

    expect(content.isPinned()).toBe(false);
  });
});
