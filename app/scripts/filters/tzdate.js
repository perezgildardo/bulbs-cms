'use strict';

angular.module('bulbsCmsApp')
  .filter('tzDate', function (dateFilter, moment) {
    return function (input, format) {
      if (!input) {
        return '';
      }
      var newdate = moment(input).format('YYYY-MM-DDTHH:mm z');
      var formattedDate = dateFilter(newdate, format);
      return formattedDate;
    };
  });
