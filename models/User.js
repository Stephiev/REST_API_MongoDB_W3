"use strict";

var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");
var eat      = require("eat");

// Keep auth data separate from user data
// Never want to send back info that has to do with auth
var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: { type: String, required: true, unique: true }, // Validation
    password: String // hashed password of our user
  }
});

// Useful site
// https://github.com/ncb000gt/node.bcrypt.js/
userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        throw (err);
      }
      callback(hash);
     });
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    if (err) {
      return callback(err);
    }
    return callback(null, res);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({ id: this._id, timeStamp: Date.now() }, secret, function(err, token) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    return callback(null, token);
  });
};

module.exports = mongoose.model("User", userSchema);
