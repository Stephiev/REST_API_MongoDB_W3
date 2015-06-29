"use strict";

module.exports = function(app) {
  app.directive("catFormDirective", function() {
    return {
      restrict: "A",
      replace: true, // way to keep semantic meaning of html code, to avoid wrapper divs
      templateUrl: "/templates/directives/cat_form.html",
      scope: {
        save: "&", // pass in create newcat function into this directive
        buttonText: "=", // interpreted as JS
        labelText: "@", // literal interpretation
        cat: "="
      },
      transclude: true
    }
  })
}
