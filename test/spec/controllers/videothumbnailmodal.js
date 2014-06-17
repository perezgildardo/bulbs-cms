'use strict';

describe('Controller: VideothumbnailmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('bulbsCmsApp'));

  var VideothumbnailmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideothumbnailmodalCtrl = $controller('VideothumbnailmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
