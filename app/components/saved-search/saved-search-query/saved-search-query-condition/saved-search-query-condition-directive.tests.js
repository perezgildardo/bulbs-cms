'use strict';

describe('Directive: savedSearchQueryCondition', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');

    inject(function(_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();

      var element = $compile('<saved-search-query-condition></saved-search-query-condition>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to summarize it\'s data as JSON', function () {
  // TODO : fill this in
    throw 'Not implemented yet.';
  });
});
