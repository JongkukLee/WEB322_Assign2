let VERBOSE = true;

const Sequelize = require('sequelize'); 
var sequelize = new Sequelize
(
    'der8rb6h09u13d', // Database
    'xrpovvieimbrgb', // User
    '925e40bd7a161f8fd0a95cdc4d34274be86df37d170115fe8641c29c23080138', // Password
    { 
        host: 'ec2-54-225-118-55.compute-1.amazonaws.com', 
        dialect: 'postgres', 
        port: 5432, 
        dialectOptions: { ssl: true } 
    }
); 

// Define models
var Employee = sequelize.define('Employee', {
    employeeNum:{
        type:Sequelize.INTEGER,
            primaryKey: true, // use "employeeNum" as a primary key
            autoIncrement: true // automatically increment the value
    },
    firstName:Sequelize.STRING,
    last_name:Sequelize.STRING,
    email:Sequelize.STRING,
    SSN:Sequelize.STRING,
    addressStreet:Sequelize.STRING,
    addresCity:Sequelize.STRING,
    addressState:Sequelize.STRING,
    addressPostal:Sequelize.STRING,
    maritalStatus:Sequelize.STRING,
    isManager:Sequelize.BOOLEAN,
    employeeManagerNum:Sequelize.INTEGER,
    status:Sequelize.STRING,
    department:Sequelize.INTEGER,
    hireDate:Sequelize.STRING
});

var Department  = sequelize.define('Department', {
    departmentId:{
        type:Sequelize.INTEGER,
            primaryKey: true, // use "departmentId" as a primary key
            autoIncrement: true // automatically increment the value
    },
    departmentName:Sequelize.STRING
});

// Asynchronously reads the entire contents of a file
module.exports.initialize = () =>
{
    return new Promise( (resolve, reject) =>
    {
        // synchronize the Database with our models and automatically add the 
        // table if it does not exist
        sequelize.sync().then(function () {
            // create a new "Employee" and add it to the database
            Employee.create({
                title: 'Employee',
                description: 'Employee Model'
            }).then(function (employee) {
                // you can now access the newly created Project via the variable project
                console.log("data-service::initialize():::successful!");
                resolve();
            }).catch(function (error) {
                console.log("data-service::initialize():::something went wrong!" + error);
                reject("unable to sync the database");
            });

            // create a new "Department" and add it to the database
            Department.create({
                title: 'Department',
                description: 'Department Model'
            }).then(function (department) {
                // you can now access the newly created Project via the variable project
                console.log("data-service::initialize():::successful!");
                resolve();
            }).catch(function (error) {
                console.log("data-service::initialize():::something went wrong!" + error);
                reject("unable to sync the database");
            });
        });
    });
};

// provide the full array of "employee" objects 
module.exports.getAllEmployees = () =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName']
            }).then(function(data){
                console.log("data-service::getAllEmployees():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getAllEmployees():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// provide an array of "employee" objects whose status property matches 
module.exports.getEmployeesByStatus = (status) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName'],
                where: { status: status } // retrieve employees with status ('Part Time', 'Full Time')
            }).then(function(data){
                console.log("data-service::getEmployeesByStatus():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getEmployeesByStatus():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// provide an array of "employee" objects whose department property matches 
module.exports.getEmployeesByDepartment = (department) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName'],
                where: { department: department } // retrieve employees with department code
            }).then(function(data){
                console.log("data-service::getEmployeesByDepartment():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getEmployeesByDepartment():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}
// provide an array of "employee" objects whose employeeManagerNum property matches 
module.exports.getEmployeesByManager = (manager) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName'],
                where: { employeeManagerNum: manager } // retrieve employees with manager number
            }).then(function(data){
                console.log("data-service::getEmployeesByManager():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getEmployeesByManager():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// provide a single of "employee" object whose employeeNum property matches 
module.exports.getEmployeeByNum = (num) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName'],
                where: { employeeNum: num } // retrieve an employee with employee number
            }).then(function(data){
                console.log("data-service::getEmployeeByNum():::successful!");
                resolve(data[0]); // only provide the first object
            }).catch(function (error) {
                console.log("data-service::getEmployeeByNum():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// provide an array of "employee" objects whose isManager property is true 
module.exports.getManagers = () =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Employee.findAll({ 
                //attributes: ['firstName'],
                where: { isManager: true } // retrieve employees with isManager property
            }).then(function(data){
                console.log("data-service::getManagers():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getManagers():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}
// provide the full array of "department"
module.exports.getDepartments = function()
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all department names only
            Department.findAll({ 
                //attributes: ['departmentName']
            }).then(function(data){
                console.log("data-service::getDepartments():::successful!");
                resolve(data);
            }).catch(function (error) {
                console.log("data-service::getDepartments():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// add employee
module.exports.addEmploye = (employeeData) =>
{ 
    return new Promise( (resolve, reject) =>
    { 
        // any blank values ("") for properties are set to null
        for (var prop in employeeData)
        {
            console.log("data-service::addEmploye():::-->" + employeeData[prop]+ "<--");          
            if(employeeData[prop] == "") employeeData[prop] = null;
        }

        // isManager is explicitly set (true or false)
        employeeData.isManager = (employeeData.isManager) ? true : false;

        sequelize.sync().then(function () {
            Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }).then(function() { 
                console.log("data-service::addEmploye():::successful!");                
                resolve();                
            }).catch(function (error) {
                console.log("data-service::addEmploye():::something went wrong!::::" + error);
                reject("unable to create employee");
            });
        });  
    });
}

// update employee
module.exports.updateEmployee = (employeeData) =>
{
    return new Promise( (resolve, reject) =>
    {
        // any blank values ("") for properties are set to null
        for (var prop in employeeData)
        {
            console.log("data-service::updateEmployee():::-->" + employeeData[prop]+ "<--");          
            if(employeeData[prop] == "") employeeData[prop] = null;
        }

        // isManager is explicitly set (true or false)
        employeeData.isManager = (employeeData.isManager) ? true : false;

        sequelize.sync().then(function () {
            Employee.update({
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            },{
                where: { employeeNum: employeeData.employeeNum } // only update user information with employee number
            }).then(function() { 
                console.log("data-service::updateEmployee():::successful!");                
                resolve();
            }).catch(function (error) {
                console.log("data-service::updateEmployee():::something went wrong!" + error);
                reject("unable to update employee");
            });
        });  
    });
}

// add department
module.exports.addDepartment = (departmentData) =>
{
    return new Promise( (resolve, reject) =>
    {
        // any blank values ("") for properties are set to null
        for (var prop in departmentData) 
            if(prop == "") departmentData.prop = null;

        sequelize.sync().then(function () {
            Department.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }).then(function() { 
                console.log("data-service::addDepartment():::successful!");
                resolve();
            }).catch(function (error) {
                console.log("data-service::addDepartment():::something went wrong!" + error);
                reject("unable to create department");
            });
        });  
    });
}

// update department
module.exports.updateDepartment = (departmentData) =>
{
    return new Promise( (resolve, reject) =>
    {
        // any blank values ("") for properties are set to null
        for (var prop in departmentData) 
            if(prop == "") departmentData.prop = null;

        sequelize.sync().then(function () {
            Department.update({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }, {
                where: { departmentId: departmentData.departmentId } // only update department information with department id
            }).then(function() { 
                console.log("data-service::updateDepartment():::successful!");                
                resolve();
            }).catch(function (error) {
                console.log("data-service::updateDepartment():::something went wrong!" + error);
                reject("unable to update department");
            });
        });  
    });
}

// provide a single of "department" object whose department id property matches 
module.exports.getDepartmentById = (id) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {        
            // return all first names only
            Department.findAll({ 
                //attributes: ['departmentName'],
                where: { departmentId: id } // retrieve an department with department id
            }).then(function(data){
                console.log("data-service::getDepartmentById():::successful!");
                resolve(data[0]); // only provide the first object
            }).catch(function (error) {
                console.log("data-service::getDepartmentById():::something went wrong!" + error);
                reject("no results returned");
            });
        });
    });
}

// delete an employee 
module.exports.deleteEmployeeByNum = (empNum) =>
{
    return new Promise( (resolve, reject) =>
    {
        sequelize.sync().then(function () {

            // remove an employee from the database
            Employee.destroy({
                where: { employeeNum: empNum } // only remove employee with employee number
            }).then(function () { 
                console.log("data-service::deleteEmployeeByNum():::successful!");
                resolve();
            }).catch(function (error) {
                console.log("data-service::deleteEmployeeByNum():::something went wrong!" + error);
                reject("unable to remove employee");
            });
        });
    });
}