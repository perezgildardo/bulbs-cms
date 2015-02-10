'use strict';

describe('Directive: customSearchQuery', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('jsTemplates');

    inject(function(_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();
// TODO : need to fill in its attributes
      var element = $compile('<custom-search-query></custom-search-query>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a button to add a condition', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a button to remove itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should be able to validate itself along with its conditions', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should auto refresh its result count when something is changed', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
