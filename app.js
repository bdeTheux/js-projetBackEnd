var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");

var achievementsRouter = require("./routes/achievements");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);

app.use("/api/achievements", achievementsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {  
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
