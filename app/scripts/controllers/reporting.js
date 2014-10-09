'use strict';

angular.module('bulbsCmsApp')
  .controller('ReportingCrtl', function ($scope, $window, $location, $, routes, ContributionReportingService) {
    $window.document.title = routes.CMS_NAMESPACE + ' | Promotion Tool'; // set title

    $scope.report;
    $scope.reports = {
      "Contributions": ContributionReportingService
    }

    


  });
