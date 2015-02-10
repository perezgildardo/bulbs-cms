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

      var element = $compile('<custom-search-query></custom-search-query>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to add a condition', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to remove a condition', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to summarize it\'s data as JSON', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a scope variable for the number of results provided by this query', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
