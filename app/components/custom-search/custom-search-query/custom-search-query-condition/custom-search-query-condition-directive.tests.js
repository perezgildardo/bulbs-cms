'use strict';

describe('Directive: customSearchQueryCondition', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('jsTemplates');

    inject(function(_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();
// TODO : need to fill in attributes
      var element = $compile('<custom-search-query-condition></custom-search-query-condition>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a button to remove itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to add new values', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should not allow the same value to be selected twice', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a button to remove a value', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should be able to validate itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should have a button to add a time period condition', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should clear out values if either field or type change', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
