"use strict";

// This fxn will immediatley return an object that gives us the metadata about our
// directive.
// Need a template and a restrict at a minimum. The restrict is how this directive can be loaded into
// the dom. Four diff ways, comments, attributes, elemens, and class = ECMA. (M for comment)
// A restric has to be in every single directive you make, class so you can garb in CSS and style all the same

module.exports = function(app) {
  app.directive("titleDirective", function() {
    return {
      restrict: "AC",
      template: "<title>I am a new title</title>",
      scope: {} // scope object for each and every instance of this directive. Isolate scope
    }
  });
};
