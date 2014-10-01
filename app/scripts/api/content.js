angular.module('bulbs.api').
  factory('ContentService', function (Restangular) {
    Restangular.setBaseUrl('/cms/api/v1/');
    Restangular.setRequestSuffix('/');

    Restangular.extendModel('content', function (obj) {
      for (var i in obj.authors) {
        obj.authors[i] = angular.extend(obj.authors[i], {
          getFullName: function() {
            return obj.contributor.first_name + ' ' + obj.contributor.last_name;
          }
        })
      }
      return obj;
    });


    Restangular.extendModel('contributions', function (obj) {
      if (obj && obj.contributor) {
        obj.contributor = angular.extend(obj.contributor, {
          getFullName: function() {
            return obj.contributor.first_name + ' ' + obj.contributor.last_name;
          }
        });
      }
      return obj;
    });

    // Restangular.addElementTransformer('contributions', true, function(contributions) {
    //   if (contributions.length === 0) {
    //     return contributions;
    //   }
    //   for(var i in contributions) {
    //     if (contributions[i] && contributions[i].contributor) {
    //       contributions[i].contributor = angular.extend(contributions[i].contributor, {
    //         getFullName: function() {
    //           console.log(this);
    //           return this.first_name + ' ' + this.last_name;
    //         }
    //       });
    //     }
    //   }
    //   return contributions;
    // });

    return Restangular.service('content');
  });