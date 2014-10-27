'use strict';

angular.module('bulbsCmsApp')
  .controller('DatetimeSelectionModalCtrl', function ($scope, $modalInstance, TIMEZONE_LABEL) {

    // ensure that we can't choose a time if date is invalid
    $scope.dateValid = false;
    $scope.$watch('tempDatetime', function () {
      $scope.dateValid = moment($scope.tempDatetime).isValid();
    });

    // copy date temporarily so user has to actually verify change to the date
    $scope.tempDatetime = angular.copy($scope.modDatetime);

    $scope.TIMEZONE_LABEL = TIMEZONE_LABEL;

    var timeNow = function () {
      return moment();
    };

    // callback function for using datetime calendar because it doesn't work at all in a sensible way
    $scope.setDate = function (newDate) {
      $scope.tempDatetime = moment(newDate);
    };

    $scope.setDateToday = function () {
      var now = timeNow();
      $scope.tempDatetime = moment().year(now.year()).month(now.month()).date(now.date());
    };

    $scope.setDateTomorrow = function () {
      var now = timeNow();
      $scope.tempDatetime = moment().year(now.year()).month(now.month()).date(now.date() + 1);
    };

    $scope.setTimeNow = function () {
      $scope.tempDatetime = timeNow();
    };

    $scope.setTimeMidnight = function () {
      $scope.tempDatetime = timeNow().hour(24).minute(0);
    };

    $scope.chooseDatetime = function () {
      if ($scope.dateValid) {
        // close modal, ensuring that output date is a moment
        var retMoment = moment($scope.tempDatetime);
        $modalInstance.close(retMoment);
      } else {
        console.error('Attempting to choose invalid date.')
      }
    };

  });