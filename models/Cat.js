"use strict";

var mongoose = require("mongoose");

var catSchema = mongoose.Schema({
  name: String,
  type: String
});

catSchema.path("name").validate(function(v) {
  return v.length > 3;
}, "Invalid name");

module.exports = mongoose.model("Cat", catSchema);
