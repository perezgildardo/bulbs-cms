'use strict';
angular.module('bulbsCmsApp.mockApi', []).run(function ($httpBackend) {
  $httpBackend.when('GET', '/contributions/contribution').respond(function (method, url, data, headers) {
    console.log(data);
    console.log(url);
    return [200, [
      {
        'id': 1,
        'content': 123,
        'role': 1,
        'contributor': {
          'id': 12345,
          'username': 'tzweibel',
          'first_name': 'Herman',
          'last_name': 'Zweibel'
        }
      },
      {
        'id': 2,
        'content': 123,
        'role': 2,
        'contributor': {
          'id': 12345,
          'username': 'tzweibel',
          'first_name': 'Herman',
          'last_name': 'Zweibel'
        }
      }
    ]]
  });
});