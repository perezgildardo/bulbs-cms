'use strict';

describe('Directive: savedSearchContentList', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');

    inject(function(_$rootScope_, $compile) {
      $scope = _$rootScope_.$new();

      var element = $compile('<saved-search-content-list></saved-search-content-list>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to search current content list', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to filter by manually added content', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to filter by manually removed content', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a scope variable with the current number of content items', function () {

  // TODO : fill this in
    throw 'Not implemented yet.';
  });
});
