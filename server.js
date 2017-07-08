/*********************************************************************************
* WEB322 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Jongkuk Lee__________ Student ID: _127730158____ Date: _2017-07-08_____
*
* Online (Heroku) Link: __https://salty-beyond-22421.herokuapp.com/______________
********************************************************************************/
let VERBOSE = false;

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
// set the path 
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

  // get all employees that match with a status (Part Time, Full Time) 
  if(req.query.status)
  {
    dataService.getEmployeesByStatus(req.query.status).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });      
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" }); 
    });
  }
  // get all employees that match with a manager id
  else if(req.query.manager)
  {
    dataService.getEmployeesByManager(req.query.manager).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });        
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
    });    
  }
  // get all employees that match with department id 
  else if(req.query.department)
  {
    dataService.getEmployeesByDepartment(req.query.department).then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });  
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
    });     
  }
  // get all employees 
  else{
    dataService.getAllEmployees().then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees" });        
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees" });       
    });
  }

});

// setup route to listen on /employee/value 
app.get("/employee/:empNum", (req, res) => { 
 
  // initialize an empty object to store the values   
  let viewData = {};
 
  dataService.getEmployeeByNum(req.params.empNum) 
  .then((data) => { 
    if (VERBOSE) console.log("server.js::app.get(/employee/:empNum,\
        (req, res):::getEmployeeByNum:::successful!"); 
    // store employee data in the "viewData" object as "data"
    viewData.data = data;  
  }).catch((e)=>{ 
    if (VERBOSE) console.log("server.js::app.get(/employee/:empNum, \
        (req, res):::getEmployeeByNum:::fail!" + e);    
    viewData.data = null; // set employee to null if there was an error  
  }).then(dataService.getDepartments) 
  .then((data) => { 
    // store department data in the "viewData" object as "departments" 
    viewData.departments = data; 
     
    // loop through viewData.departments and once we have found the 
    // departmentId that matches the employee's "department" value, 
    // add a "selected" property to the matching        
    // viewData.departments object 
    if (VERBOSE) console.log("server.js::app.get(/employee/:empNum, \
        (req, res):::getDeartments:::successful!" + viewData.departments);  
    
    for (let i = 0; i < viewData.departments.length; i++) { 
      if (viewData.departments[i].departmentId == viewData.data.department) {           
          viewData.departments[i].selected = true; 
      } 
    } 
    
    if (VERBOSE) console.log("server.js::app.get(/employee/:empNum, \
        (req, res):::getDeartments:::successful!");  
  }).catch((e)=>{ 
    if (VERBOSE) console.log("server.js::app.get(/employee/:empNum, \
        (req, res):::getDeartments:::fail!" + e);   
    viewData.departments=[]; // set departments to empty if there was an error 
  }).then(()=>{ 
    if(viewData.data == null){ // if no employee - return an error           
        res.status(404).send("Employee Not Found");    
    } else { 
        if (VERBOSE) console.log("server.js::app.get(/employee/:empNum, \
            (req, res):::successful!" + viewData.data.firstName);
        res.render("employee", { viewData: viewData }); // render the "employee" view 
      } 
  }); 
}); 

// setup route to listen on /managers 
app.get("/managers", (req,res) => {
    dataService.getManagers().then( (data) =>
    {
      res.render("employeeList", { data: data, title: "Employees (Managers)" });      
    })
    .catch( (errorMsg)=> {
      res.render("employeeList", { data: {}, title: "Employees (Managers)" });      
    });
});

// setup route to listen on /departments  
app.get("/departments", (req,res) => {
    dataService.getDepartments().then( (data) =>
    {
      res.render("departmentList", { data: data, title: "Departments" });
    })
    .catch( (errorMsg)=> {
      res.render("departmentList", { data: {}, title: "Departments" });
    });  
});

// setup route to add new employee
app.get("/employees/add", (req,res) => {
    dataService.getDepartments().then( (data) =>
    {
      res.render("addEmployee", {departments: data});
    })
    .catch( (errorMsg)=> {
      res.render("addEmployee", {departments: []});  
    });
});

// setup POST route to add employees and redirect page
app.post("/employees/add", (req, res) => { 
    if (VERBOSE) console.log(req.body);
    dataService.addEmploye(req.body).then( () =>
    {
      res.redirect("/employees");
    });
}); 

// setup POST route to update employees and redirect page
app.post("/employee/update", (req, res) => { 
    if (VERBOSE) console.log(req.body); 
    dataService.updateEmployee(req.body).then( () => {
      res.redirect("/employees"); 
    });
});

// setup route to add new department`
app.get("/departments/add", (req,res) => {     
  res.render("addDepartment"); 
});

// setup POST route to add departments and redirect page
app.post("/departments/add", (req, res) => { 
    if (VERBOSE) console.log(req.body);
    dataService.addDepartment(req.body).then( () =>
    {
      res.redirect("/departments");
    });
}); 

// setup POST route to update departments and redirect page
app.post("/department/update", (req, res) => { 
    if (VERBOSE) console.log(req.body); 
    dataService.updateDepartment(req.body).then( () => {
      res.redirect("/departments"); 
    });
});

// setup route to listen on /department/value 
app.get("/department/:departmentId", (req,res) => {
    dataService.getDepartmentById(req.params.departmentId).then( (data) =>
    {
      if (VERBOSE) console.log("server.js::app.get(/department/:departmentId, \
          (req,res):::" + data.departmentName);
      res.render("department", { data: data });         
    })
    .catch( (errorMsg)=> {
      res.status(404).send("Department Not Found");        
    });
});

// setup route to listen on /employee/delete/value 
app.get("/employee/delete/:empNum", (req,res) => {
    dataService.deleteEmployeeByNum(req.params.empNum).then( () =>
    {
      res.redirect("/employees");      
    })
    .catch( (errorMsg)=> {
      res.status(500).send("Unable to Remove Employee / Employee not found");        
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
  if (VERBOSE) console.log("server.js::dataService.initialize().then().catch()");
  console.log(errorMsg);
});
