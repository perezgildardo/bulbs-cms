'use strict';

describe('Directive: customSearchContentListItem', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('jsTemplates');

    inject(function(_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();

      var element = $compile('<custom-search-content-list-item></custom-search-content-list-item>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should provide a function to access parent scope\'s pin functionality to pin itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to access parent scope\'s remove functionality to remove itself', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });

  it('should provide a function to access a parent scope\'s functionality to readd itself if removed', function () {
// TODO : fill this in
    throw 'Not implemented yet.';
  });
});
