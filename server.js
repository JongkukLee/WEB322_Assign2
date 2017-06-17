/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Jongkuk Lee__________ Student ID: _127730158____ Date: _2017-06-23_____
*
* Online (Heroku) Link: __https://arcane-fjord-78560.herokuapp.com/______________
********************************************************************************/

const express = require("express");
const exphbs = require('express-handlebars');      
const bodyParser = require('body-parser'); 
var app = express();
var dataService = require("./data-service.js");
var HTTP_PORT = process.env.PORT || 8080;

// set to use static pages or images
app.use(express.static('public'));
// set to use express-handlebars
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({   extname: ".hbs",   defaultLayout: 'layout', 
  helpers: { 
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3) 
        throw new Error("Handlebars Helper equal needs 2 parameters");
      
      if (lvalue != rvalue) { 
        return options.inverse(this); 
      } else { 
        return options.fn(this); 
      } 
    } 
  } })); 
app.set("view engine", ".hbs");

// to-do: 
var path = require("path");

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup route to listen on /
app.get("/", function(req,res){
  res.render("home");
});
// setup route to listen on /about
app.get("/about", function(req,res){
  res.render("about");
});
// setup route to listen on /employees
app.get("/employees", (req, res) =>{

  //res.send("TODO: get all employees for department 1");
  if(req.query.status)
  {
    dataService.getEmployeesByStatus(req.query.status).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });      
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" }); 
      //res.json({message: errorMsg});
    });
  }
  else if(req.query.manager)
  {
    dataService.getEmployeesByManager(req.query.manager).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });        
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
      //res.json({message: errorMsg});
    });    
  }
  else if(req.query.department)
  {
    dataService.getEmployeesByDepartment(req.query.department).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });  
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
      //res.json({message: errorMsg});
    });     
  }
  else{
    dataService.getAllEmployees().then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });        
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
      //res.json({message: errorMsg});
    });
  }

});

// setup route to listen on /employee/value 
app.get("/employee/:empNum", (req,res) => {
    dataService.getEmployeeByNum(req.params.empNum).then( (data) =>
    {
      res.render("employee", { data: data });         
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.status(404).send("Employee Not Found");        
      //res.json({message: errorMsg});
    });
});

// setup route to listen on /managers 
app.get("/managers", (req,res) => {
    dataService.getManagers().then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees (Managers)" });      
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees (Managers)" });      
      //res.json({message: errorMsg});
    });
});

// setup route to listen on /departments  
app.get("/departments", (req,res) => {
    dataService.getDepartments().then( (data) =>
    {
      res.render("departmentList", { data: data, title: "Departments" });
      //res.json(data);
    })
    .catch( (errorMsg)=> {
      res.render("departmentList", { data: {}, title: "Departments" });
      //res.json({message: errorMsg});
    });  
});

// setup route to add new employee
app.get("/employees/add", (req,res) => {     
  res.render("addEmployee"); 
});

// setup POST route to add employees and redirect page
app.post("/employees/add", (req, res) => { 
    console.log(req.body);
    dataService.addEmploye(req.body).then( () =>
    {
      res.redirect("/employees");
    });
}); 

// setup POST route to update employees and redirect page
app.post("/employee/update", (req, res) => { 
    console.log(req.body); 
    dataService.updateEmployee(req.body).then( () => {
      res.redirect("/employees"); 
    });
});

// setup the no matching route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
dataService.initialize().then( () => {
  app.listen(HTTP_PORT, onHttpStart);
})
.catch( (errorMsg) => {
  console.log("server.js::dataService.initialize().then().catch()");
  console.log(errorMsg);
});
