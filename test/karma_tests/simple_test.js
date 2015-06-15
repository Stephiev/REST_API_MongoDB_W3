"use strict";

// add expect into list of globals for jasmine tests.
// create sep jshint task for your jasmine and karma tests
// since globals will be different than in mocha chai test
describe("simple test", function() {
  it("should be true", function() {
    expect(true).toBe(true);
  });
});
