"use strict";

process.env.MONGOLAB_URI = "mongodb://localhost/cats_test";
require("../server.js");

var mongoose = require("mongoose");
var chai     = require("chai");
var chaihttp = require("chai-http");
var expect   = chai.expect;
var User     = require("../models/User");
var theToken = [];
var testUser = { username: "tester", email: "mytest@test.com", password: "foobar" };
var newUser  = { username: "NEWtester", email: "NEWmytest@test.com", password: "foobar" };
chai.use(chaihttp);

describe("Authentication", function() {
    before(function(done) {
        chai.request("localhost:3000")
          .post("/api/create_user")
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.eq(null);
            testUser.token = res.body.token;
            done();
          });
      });

      after(function() {
        mongoose.connection.db.dropDatabase(function() {});
      });

    describe("POST /create_user", function() {
      describe("with INVALID input", function() {
        it("should not allow a duplicate email", function(done) {
          chai.request("localhost:3000")
            .post("/api/create_user")
            .send(testUser)
            .end(function(err, res) {
              expect(err).to.eq(null);
              expect(res.body.msg).to.eql("could not create user");
              done();
            });
        });

      });

      describe("with VALID input", function() {
          it("should be able to create a new user", function(done) {
          chai.request("localhost:3000")
            .post("/api/create_user")
            .send(newUser)
            .end(function(err, res) {
              expect(err).to.eq(null);
              expect(typeof res.body.token).to.eq("string");
              User.findOne({ username: "NEWtester" }, function(err, user) {
                expect(err).to.eq(null);
                expect(user.username).to.eq("NEWtester");
                expect(user.basic.email).to.eq("NEWmytest@test.com");
                done();
              });
            });
        });
      });
    });

  describe("GET to /api/login", function() {
    describe("with an EXISTING user", function() {
      it("should return a token", function(done) {
        chai.request("localhost:3000")
          .get("/api/login")
          .auth(testUser.email, testUser.password)
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(typeof res.body.token).to.eq("string");
            done();
          });
      });
    });
     describe("with a NONEXISTENT user", function() {
      it("should respond with \"no such user\"", function(done) {
        chai.request("localhost:3000")
          .get("/api/login")
          .auth("doesnot@exist.com", "Nope")
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.text).to.eq("no such user\n");
            done();
          });
      });
    });

  });
});

