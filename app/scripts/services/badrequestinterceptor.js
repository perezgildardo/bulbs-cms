angular.module('bulbsCmsApp').factory('BadRequestInterceptor', function ($q, $injector, routes) {
    return {
      responseError: function (rejection) {
        $injector.invoke(function($modal){
          if (rejection.status === 400) {
            var detail = rejection.data && rejection.data.detail || 'Something was wrong with your request.';
            $modal.open({
              templateUrl: routes.PARTIALS_URL + 'modals/403-modal.html',
              controller: 'ForbiddenmodalCtrl',
              resolve: {
                detail: function(){ return detail; }
              }
            });
          }
        });
        return $q.reject(rejection);
      }
    }
  });