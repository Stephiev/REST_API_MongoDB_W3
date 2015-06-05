'use strict';

// document.write("Hello from JS");

var greet    = require("./greet");
var catList  = document.getElementById('catlist');
var typeList = document.getElementById("typelist");
var request  = require("superagent");

document.write(greet());

request
  .get("/api/cats")
  .end(function(err, res){
    if (err) return console.log(err);
    var cats = JSON.parse(res.text);


    cats.forEach(function(cat) {
      if (cat.name !== undefined) {
        var noteEl = document.createElement("li");
        noteEl.innerHTML = cat.name;
        catList.appendChild(noteEl);
    }
    });

    cats.forEach(function(cat) {
      if (cat.type !== undefined) {
        var noteEl = document.createElement("li");
        noteEl.innerHTML = cat.type;
        typeList.appendChild(noteEl);
      }
    });
  });

// require('angular/angular');

// var notesApp = angular.module('notesApp', []);
