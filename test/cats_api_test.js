"use strict";
process.env.MONGOLAB_URI = "mongodb://localhost/cats_test";
require("../server.js");

var mongoose = require("mongoose");
var chai = require("chai");
var chaihttp = require("chai-http");
chai.use(chaihttp);
var expect = chai.expect;

var Cat = require("../models/Cat");

describe("cats REST api", function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it("should be able to create a new cat", function(done) {
    chai.request("localhost:3000")
      .post("/api/cats")
      .send({ name: "Oliver" })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql("Oliver");
        expect(res.body).to.have.property("_id");
        done();
      });
  });

  it("should get an array of cat", function() {
    chai.request("localhost:3000")
      .get("/api/cats")
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(Array.isArray(res.body)).to.be.eql(true);
      });
  });

  describe("needs an existing cat to work with", function() {
    beforeEach(function(done) {
      var testCat = new Cat({ name: "Kopi" });
      testCat.save(function(err, data) {
        if (err) { throw err; }
        this.testCat = data;
        done();
      }.bind(this));
    });

    it("should update a cat", function(done) {
      var id = this.testCat._id;
      chai.request("localhost:3000")
        .put("/api/cats/" + id)
        .send({ name: "Ikaika new name" })
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("success");
          done();
        });
    });

    it("should be able to delete a cat", function(done) {
      chai.request("localhost:3000")
        .del("/api/cats/" + this.testCat._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("success");
          done();
        });
      });
    });
});

