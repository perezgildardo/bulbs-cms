'use strict';

angular.module('savedSearch.service.content.factory', [
  'lodash'
])
  .factory('SavedSearchServiceContent', function (_) {

    var states = {
      NONE: 'no special state',
      ADDED: 'manually added',
      REMOVED: 'manually removed'
    };

    var SavedSearchServiceContent = function (params) {
      this.id = params.id;
      this.title = params.title;
      this._pinned = _.result(params, 'pinned', false);

      this._state = states.NONE;
    };

    SavedSearchServiceContent.prototype = {
      markManuallyAdded: function () { this._state = states.ADDED; },
      isManuallyAdded: function () { return this._state === states.ADDED; },
      markManuallyRemoved: function () { this._state = states.REMOVED; },
      isManuallyRemoved: function () { return this._state === states.REMOVED; },
      markNormalResult: function () { this._state = states.NONE; },
      isNormalResult: function () { return this._state === states.NONE; },
      pin: function () { this.pinned = true; },
      unpin: function () { this.pinned = false; },
      isPinned: function () { return this.pinned === true; }
    };

    return SavedSearchServiceContent;
  });
