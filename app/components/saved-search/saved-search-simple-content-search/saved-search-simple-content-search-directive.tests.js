'use strict';

describe('Directive: savedSearchSimpleContentSearch', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');

    inject(function(_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();

      var element = $compile('')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to search content', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to add selected content', function () {
  // TODO : fill this in
    throw 'Not implemented yet.';
  });
});
