"use strict";

var mongoose = require("mongoose");
var express = require("express");
var passport = require("passport");
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || "changethischangethis";
var catsRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect("mongodb://localhost/cats_development");

app.use(passport.initialize());

require("./lib/passport_strategy")(passport);

require("./routes/cats_routes")(catsRoutes);
require("./routes/auth_routes")(usersRoutes, passport);

app.use("/api", catsRoutes);
app.use("/api", usersRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port " + (process.env.PORT || 3000));
});

