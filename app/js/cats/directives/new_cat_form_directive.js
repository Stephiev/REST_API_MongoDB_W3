"use strict";

module.exports = function(app) {
  app.directive("newCatForm", function() {
    return {
      restrict: "A",
      replace: true, // way to keep semantic meaning of html code, to avoid wrapper divs
      templateUrl: "/templates/directives/new_cat_form.html"
    }
  })
}
