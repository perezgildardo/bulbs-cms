'use strict';

angular.module('bulbsCmsApp.promotion')
  .controller('PromotionCtrl', function ($scope, $http, $window, $, Contentlist, options) {

    $window.document.title = options.namespace + ' | Promotion Tool'; // set title

    function getPzones() {
      $http({
        method: 'GET',
        url: options.endpoint
      }).success(function (data) {
        $scope.pzones = data;
        $scope.pzone = data[0];
        $scope.$watch('pzone', function () {
          getPromotedArea();
        });
      }).error(function (data) {
        alert('Content list does not exist.');
      });
    }

    getPzones();

    function getPromotedArea() {
      $http({
        method: 'GET',
        url: options.endpoint + $scope.pzone.id +'/'
      }).success(function (data) {
        $scope.promotedArticles = data;
      }).error(function (data) {
        alert('Content list does not exist.');
      });
    }

    $scope.articleIsInPromotedArticles = function (id) {
      if ($scope.promotedArticles) {
        for (var i in $scope.promotedArticles) {
          if ($scope.promotedArticles[i].id === id) {
            return true;
          }
        }
      }
      return false;
    };

    Contentlist.setUrl('/cms/api/v1/content/?published=True');

    var getContentCallback = function ($scope, data) {
      $scope.articles = data.results;
      $scope.totalItems = data.count;
    };

    $scope.getContent = function () {
      Contentlist.getContent($scope, getContentCallback);
    };

    $scope.getContent();

    var pA = $('.promotion-area'),
      pC = $('.promotion-container');

    $scope.insertArticle = function (article) {
      $scope.selectedArticle = article;

      pA.addClass('select-mode');
      pC.off('click');
      pC.on('click', '.promotion-area.select-mode .article-container', function (e) {
        var index = $(this).parents('[data-index]').data('index') - 0;
        if (!$scope.promotedArticles[index] || !$scope.promotedArticles[index].id) {
          $scope.promotedArticles.splice(index, 1, $scope.selectedArticle);
        }
        else { $scope.promotedArticles.splice(index, 0, $scope.selectedArticle); }
        if ($scope.promotedArticles.length > 6) {
          $scope.promotedArticles.pop($scope.promotedArticles.length);
        }
        pA.removeClass('select-mode');
        $scope.$apply();
      });
    };

    $scope.replaceArticle = function (article) {
      $scope.selectedArticle = article;

      pA.addClass('select-mode');
      pC.off('click');
      pC.on('click', '.promotion-area.select-mode .article-container', function (e) {
        var index = $(this).parents('[data-index]').data('index');
        $scope.promotedArticles.splice(index, 1, $scope.selectedArticle);
        pA.removeClass('select-mode');
        $scope.$apply();
      });
    };

    $scope.clearTopArticle = function () {
      $scope.promotedArticles[0] = {};
    };

    $scope.save = function () {
      var items = $scope.promotedArticles.slice(0); //copy
      if (!items[0].id) {
        items.shift();
      }

      $('.save-button').html('<i class="fa fa-refresh fa-spin"></i> Saving');

      $http({
        method: 'PUT',
        url: options.endpoint + $scope.pzone.id + '/',
        data: {name: $scope.pzone.id, items: items}
      }).success(function (data) {  //we should write this to scope.promotedArticles again for coherency but i haint dun it
        $('.save-button').removeClass('btn-danger').addClass('btn-success').html('<i class="fa fa-check"></i> Saved');
        window.setTimeout(function () {
          $('.save-button').html('Save');
        }, 2000);
      }).error(function (data) {
        $('.save-button').removeClass('btn-success').addClass('btn-danger').html('<i class="fa fa-frown-o"></i> Error');
        window.setTimeout(function () {
          $('.save-button').html('Save');
        }, 2000);
      });
    };

    $scope.moveUp = function (index) {
      if (index === 0) { return; }
      var toMove = $scope.promotedArticles[index];
      $scope.promotedArticles[index] = $scope.promotedArticles[index - 1];
      $scope.promotedArticles[index - 1] = toMove;
    };

    $scope.moveDown = function (index) {
      if (index === $scope.promotedArticles.length - 1) { return; }
      var toMove = $scope.promotedArticles[index];
      $scope.promotedArticles[index] = $scope.promotedArticles[index + 1];
      $scope.promotedArticles[index + 1] = toMove;
    };


    $('body').on('shown.bs.collapse', '#page-prev .collapse', function () {
      $window.picturefill();
    });


  });
