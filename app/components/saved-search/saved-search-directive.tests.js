'use strict';

describe('Directive: savedSearch', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');

    inject(function(_$rootScope_, $compile) {
      $scope = _$rootScope_.$new();

      var element = $compile('<saved-search></saved-search>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to save the saved search', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should automatically requery when something has changed with query parameters', function () {
  // TODO : fill this in
    throw 'Not implemented yet.';
  });
});
