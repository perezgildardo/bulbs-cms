'use strict';

angular.module('bulbsCmsApp')
  .controller('ReportingCtrl', function ($scope, $window, $, $location, $filter, Login, routes, ContributionReportingService) {
    $window.document.title = routes.CMS_NAMESPACE + ' | Reporting'; // set title

    $scope.report;
    $scope.reports = {
      "Contributions": {
        service: ContributionReportingService,
        headings: ['id', 'role', 'notes', 'content', 'user'],
        downloadURL: '/cms/api/v1/contributions/reporting/'
      }
    };
    $scope.downloadURL;
    $scope.items = []
    $scope.headings = [];

    $scope.start;
    $scope.end;

    $scope.startOpen = false;
    $scope.endOpen = false;

    $scope.openStart = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startOpen = true;
    }

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endOpen = true;
    }

    $scope.$watchCollection('[report, start, end]', function(params){
      var report = params[0];
      var start = params[1];
      var end = params[2];
      if (report) {
        $scope.headings = report.headings;
        $scope.items = [];

        var reportParams = {};
        $scope.downloadURL = report.downloadURL + '?format=csv'

        // End is only gonna work if you specify a start
        if (end) {
          var endParam = $filter('date')(end, 'yyyy-MM-dd');
          reportParams['end'] = endParam;
          $scope.downloadURL += ('&end=' + endParam)
        }

        if (start) {
          var startParam = $filter('date')(start, 'yyyy-MM-dd');
          reportParams['start'] = startParam;
          $scope.downloadURL += ('&start=' + startParam)
        }

        report.service.getList(reportParams).then(function(data){
          $scope.items = data;
        })
      }
    });



  });
