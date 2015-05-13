"use strict";
require("../server.js");

var chai = require("chai");
var chaihttp = require("chai-http");
chai.use(chaihttp);
var expect = chai.expect;
var Sql = require("sequelize");
var sql = new Sql("cat_dev", "cat_dev", "foobar123", { dialect: "postgres" });

var Cat = require("../models/Cat.js");

describe("cats REST api", function() {
  var newCat;
  before(function(done) {
    sql.sync({ force: true })
      .then(function() {
        Cat.create({ name: "Binx", type: "small" })
        .then(function(data) {
          newCat = data.dataValues;
          done();
        })
        .error(function(err) {
          console.log(err);
          done();
        });
      });
  });

  it("should be able to create a new cat", function(done) {
    chai.request("localhost:3000")
      .post("/api/cats")
      .send({ name: "Oliver", type: "Fat" })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql("Oliver");
        expect(res.body).to.have.property("id");
        done();
      });
  });

  it("should get an array of cats", function() {
    chai.request("localhost:3000")
      .get("/api/cats")
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(Array.isArray(res.body)).to.be.eql(true);
      });
  });

  describe("needs an existing cat to work with", function() {
    var newCat;
    before(function(done) {
      sql.sync({ force: true })
        .then(function() {
          Cat.create({ name: "Binx", type: "small" })
          .then(function(data) {
            newCat = data.dataValues;
            done();
          })
          .error(function(err) {
            console.log(err);
            done();
          });
        });
    });

    it("should update a cat", function(done) {
      chai.request("localhost:3000")
        .put("/api/cats/" + newCat.id)
        .send({ name: "Ikaika new name", type: "Long" })
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("success");
          done();
        });
    });

    it("should be able to delete a cat", function(done) {
      chai.request("localhost:3000")
        .del("/api/cats/" + newCat.id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("success");
          done();
        });
    });

    after(function(done) {
      var catIds;
      sql.sync({ force: true })
        .then(function() {
          Cat.findAll()
            .then(function(data) {
              catIds = [];
              data.forEach(function(elem, index, origArr) {
                catIds.push(elem.id);
                if (data.length - 1 === index) {
                  Cat.destroy({ where: { id: catIds } });
                  done();
                }
              });
            });
        });
    });

    // Thought this would work but causes errors, though the tests still pass
    // after(function(done) {
    //   Cat.drop();
    //   done();
    // });
  });
});
