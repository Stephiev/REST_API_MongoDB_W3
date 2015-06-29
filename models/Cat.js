"use strict";

var mongoose = require("mongoose");

var catSchema = mongoose.Schema({
  authorId: { type: String, required: true },
  name: { type: String, required: true },
  type: String
});

catSchema.path("name").validate(function(v) {
  return v.length >= 3;
}, "Invalid name, must be longer than 3 characters");

module.exports = mongoose.model("Cat", catSchema);
