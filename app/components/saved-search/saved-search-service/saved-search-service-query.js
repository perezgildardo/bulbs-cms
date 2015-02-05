'use strict';

angular.module('savedSearch.service.query.factory', [
  'savedSearch.service.condition.factory'
])
  .factory('SavedSearchServiceQuery', function (SavedSearchServiceCondition) {

    var SavedSearchServiceQuery = function () {
      this._conditions = [];
      this._resultCount = 0;
    };

    /**
     * Create a new condition for this query.
     *
     * @returns {SavedSearchServiceCondition} condition added to condition list.
     */
    SavedSearchServiceQuery.prototype.newCondition = function () {
      var condition = new SavedSearchServiceCondition();
      this._conditions.push(condition);
      return condition;
    };

    /**
     * Retrieve {@link SavedSearchServiceCondition} at given index.
     *
     * @param {Number} index - index of item to retrieve.
     * @returns {SavedSearchServiceCondition|undefined} item if one exists at given
     *  index, undefined otherwise.
     */
    SavedSearchServiceQuery.prototype.getCondition = function (index) {
      return this._conditions[index];
    };

    /**
     * Remove {@link SavedSearchServiceCondition} at given index.
     *
     * @param {Number} index - index of item to remove.
     * @returns {Boolean} true if item was removed, false otherwise.
     */
    SavedSearchServiceQuery.prototype.removeCondition = function (index) {
      var spliced = this._conditions.splice(index, 1);
      return spliced.length > 0;
    };

    /**
     * Get result count for this query. This number is updated via the update function.
     *
     * @returns {Number} result count for query.
     */
    SavedSearchServiceQuery.prototype.getResultCount = function () {
      return this._resultCount;
    };

    return SavedSearchServiceQuery;
  });
