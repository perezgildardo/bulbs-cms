'use strict';

describe('Factory: CustomSearchServiceCondition', function () {
  var
    customSearchServiceCondition;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('customSearch.service.condition.factory');

    inject(function (CustomSearchServiceCondition) {
      customSearchServiceCondition = new CustomSearchServiceCondition();
    });
  });

  it('should be able to add values', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should not allow the same value to be added twice', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should be able to remove values', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
