'use strict';

angular.module('bulbsCmsApp')
  .service('ContentApi', [
    'BulbsApi', '$resource', function ContentApi(BulbsApi, $resource) {
    var baseUrl = this.baseUrl = BulbsApi.baseUrl + '/content';
    this.Content = $resource(
      baseUrl + '/:id/', {
        'id': '@id'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      }
    );
  }
]);