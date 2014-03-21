'use strict';

angular.module('bulbsCmsApp')
  .service('BulbsApi', [
    'bulbsBaseUrl',
    function BulbsApi(bulbsBaseUrl) {
      this.baseUrl = bulbsBaseUrl;
    }
  ]).constant('bulbsBaseUrl', 'http://localhost:8080/api/v1');
