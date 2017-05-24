var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup another route to listen on /about
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname + "/views/home.html"));
});
// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

// to-do: add	the	line:	app.use(express.static('public'));
app.use(express.static('public'));

var path = require("path");

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);