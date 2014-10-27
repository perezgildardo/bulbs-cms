'use strict';

angular.module('bulbsCmsApp')
  .filter('tzDate', function (dateFilter, moment) {
    return function (input, format) {
      if (!input) {
        return '';
      }
      var inputDate = moment(input);
      var newdate = inputDate.format('YYYY-MM-DDTHH:mm');
      var formattedDate = dateFilter(newdate, format);
      if (format.toLowerCase().indexOf('h') > -1) {
        formattedDate += ' ' + inputDate.format('z');
      }
      return formattedDate;
    };
  });
