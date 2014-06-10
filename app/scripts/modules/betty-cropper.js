angular.module('BettyCropper', [])
  .service('BettyCropper', function BettyCropper($http, $interpolate, $q, IMAGE_SERVER_URL, BC_API_KEY) {
    this.upload = function (files) {
      var uploadImageDeferred = $q.defer();

      if (files.length != 1) {
        uploadImageDeferred.reject('We need exactly one image!');
        return;
      }
      var file = files[0];
      if (file.type.indexOf('image/') != 0) {
        uploadImageDeferred.reject('Not an image!');
      }

      if (file.size > 6800000) {
        uploadImageDeferred.reject('The file is too large!')
      }

      this.new(
        file
      ).success(function(success){
        uploadImageDeferred.resolve(success);
      }).error(function(error){
        uploadImageDeferred.reject(error);
      });

      return uploadImageDeferred.promise;
    }

    this.detail = function (id) {
      return $http({
        method: 'GET',
        url: IMAGE_SERVER_URL + '/api/' + id,
        headers: {
          'X-Betty-Api-Key': BC_API_KEY,
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    this.detailPatch = function (id, name, credit, selections) {
      return $http({
        method: 'PATCH',
        url: IMAGE_SERVER_URL + '/api/' + id,
        headers: {
          'X-Betty-Api-Key': BC_API_KEY,
          'Content-Type': undefined
        },
        data: {
          name: name,
          credit: credit,
          selections: selections
        },
        transformRequest: angular.identity
      });
    };

    this.new = function (image, name, credit) {
      var imageData = new FormData();
      imageData.append('image', image);
      if (name) { imageData.append('name', name); }
      if (credit) { imageData.append('credit', credit); }

      return $http({
        method: 'POST',
        url: IMAGE_SERVER_URL + '/api/new',
        headers: {
          'X-Betty-Api-Key': BC_API_KEY,
          'Content-Type': undefined
        },
        data: imageData,
        transformRequest: angular.identity
      });
    };

    this.updateSelection = function (id, ratio, selections) {
      return $http({
        method: 'POST',
        url: IMAGE_SERVER_URL + '/api/' + id + "/" + ratio,
        headers: {
          'X-Betty-Api-Key': BC_API_KEY,
          'Content-Type': undefined
        },
        data: selections
      });
    };

    this.url = function (id, crop, width, format) {
      var exp = $interpolate(
        "{{ url }}/{{ id }}/{{ crop }}/{{ width }}.{{ format }}"
      );
      return exp({
        url: IMAGE_SERVER_URL,
        id: id,
        crop: crop,
        width: width,
        format: format
      });
    };

    this.origJpg = function (id, width) {
      return this.url(id, 'original', width, 'jpg');
    };

    this.origGif = function (id, width) {
      return this.url(id, 'original', width, 'gif');
    };

  });
