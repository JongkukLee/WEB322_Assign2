/*********************************************************************************
* WEB322 – Assignment 02 Test
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Jongkuk Lee__________ Student ID: _127730158____ Date: _2017-05-26_____
*
* Online (Heroku) Link: __https://arcane-fjord-78560.herokuapp.com/______________
********************************************************************************/

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

// to-do: 
app.use(express.static('public'));

// to-do: 
var path = require("path");

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
