"use strict";

var mongoose   = require("mongoose");
var chai       = require("chai");
var chaihttp   = require("chai-http");
var expect     = chai.expect;
var testUser   = { username: "tester", email: "mytest@test.com", password: "foobar" };
var catRequest = { name: "Bunny", type: "Chubby", token: null };
var Cat        = require("../models/Cat");
chai.use(chaihttp);

process.env.MONGOLAB_URI = "mongodb://localhost/cats_test";
require("../server.js");

describe("cats REST api", function() {
     before(function(done) {
        chai.request("localhost:3000")
          .post("/api/create_user")
          .send(testUser)
          .end(function(err, res) {
            expect(err).to.eq(null);
            catRequest.token = res.body.token;
            done();
          });
      });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe("POST to /api/cats", function() {
    it("should be able to create a new cat", function(done) {
      chai.request("localhost:3000")
        .post("/api/cats")
        .send(catRequest)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql("Bunny");
          expect(res.body).to.have.property("_id");
          done();
        });
    });
  });

  describe("GET to /api/cats", function() {
    it("should get an array of cats", function() {
      chai.request("localhost:3000")
        .get("/api/cats")
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql("object");
          expect(Array.isArray(res.body)).to.be.eql(true);
        });
    });
  });

  describe("needs an existing cat to work with", function() {
    before(function(done) {
      var testCat = new Cat({ name: "Kopi", type: "Skinny" });
      testCat.save(function(err, data) {
        if (err) { throw err; }
        this.testCat = data;
        done();
      }.bind(this));
    });

    describe("PATCH to /api/cats/:id", function() {
      it("should update a cat", function(done) {
        var id = this.testCat._id;
        chai.request("localhost:3000")
          .patch("/api/cats/" + id)
          .send({ name: "Ikaika new name", token: catRequest.token })
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql("success");
            done();
          });
      });
    });

    describe("DELETE to /api/cats/:id", function() {
      it("should be able to delete a cat", function(done) {
        chai.request("localhost:3000")
          .del("/api/cats/" + this.testCat._id)
          .send({ token: catRequest.token })
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql("success");
            done();
          });
      });
    });
  });
});

