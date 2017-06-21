let VERBOSE = true;

// use File System module
const fs = require('fs');

// declare global variable
var employees = [];
var departments = [];
var empCount = 0;
// Asynchronously reads the entire contents of a file
module.exports.initialize = () =>
{
    return new Promise( (resolve, reject) =>
    {
         fs.readFile('./data/employees.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                employees = JSON.parse(data);
                empCount = employees.length;
                //console.log("data-service::initialize()::Employee Count: " + employees.length); 
                //console.log(employees[0]);                               
                if (employees.length == 0) {
                    reject("No data from employees.json was returned");
                } else {

                    fs.readFile('./data/departments.json', (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            departments = JSON.parse(data);
                            //console.log("data-service::initialize()::Departments Count: " + departments.length);  
                            //console.log(departments[0]);                              
                            if (departments.length == 0)
                                reject("No data from departments.json was returned");
                            else
                                resolve();
                        }
                    });
                }
            }
         });
    });
};

// add employee
module.exports.addEmploye = (employeeData) =>
{
    return new Promise( (resolve, reject) =>
    {
        empCount++;
        employeeData.employeeNum = empCount;
        if(employeeData.isManager == "on") employeeData.isManager = true;
        else employeeData.isManager = false;
        employees.push(employeeData);
        resolve();     
    });
}

// update employee
module.exports.updateEmployee = (employeeData) =>
{
    return new Promise( (resolve, reject) =>
    {
        for(var i = 0; i < employees.length; i++)
        {
            if(employees[i].employeeNum == employeeData.employeeNum)
            {
                // When the matching employee is found, 
                // overwrite it with the new employee
                if(employeeData.isManager == "on") employeeData.isManager = true;
                else employeeData.isManager = false;                
                employees[i] = employeeData;
                break;
            }
        }
        resolve();
    });
}

// provide the full array of "employee" objects 
module.exports.getAllEmployees = () =>
{
    return new Promise( (resolve, reject) =>
    {
        // log        
        if(VERBOSE) console.log("data-service::getAllEmployees()::Employee Count: " + employees.length); 

        if(employees.length > 0)
            resolve(employees); 
        else
            reject("no results returned");
    });
}

// provide an array of "employee" objects whose status property matches 
module.exports.getEmployeesByStatus = (status) =>
{
    return new Promise( (resolve, reject) =>
    {
        var employeesByStatus = [];
        for(var i = 0, j = 0; i < employees.length; i++)
        {
            if(employees[i].status == status)
            {
                employeesByStatus[j] = employees[i];
                j++;
            }
        }
        // log        
        if(VERBOSE) console.log("data-service::getEmployeesByStatus()::Employee Count: " + (j + 1)); 

        if(j > 0) resolve(employeesByStatus);
        else reject("no results returned");
    });
}

// provide an array of "employee" objects whose department property matches 
module.exports.getEmployeesByDepartment = (department) =>
{
    return new Promise( (resolve, reject) =>
    {
        var employeesByDept = [];
        for(var i = 0, j = 0; i < employees.length; i++)
        {
            if(employees[i].department == department)
            {
                employeesByDept[j] = employees[i];
                j++;
            }
        }
        // log         
        if(VERBOSE) console.log("data-service::getEmployeesByDepartment()::Employee Count: " + (j + 1)); 

        if(j > 0) resolve(employeesByDept);
        else reject("no results returned");
    });
}
// provide an array of "employee" objects whose employeeManagerNum property matches 
module.exports.getEmployeesByManager = (manager) =>
{
    return new Promise( (resolve, reject) =>
    {
        var empByManager = [];
        for(var i = 0, j = 0; i < employees.length; i++)
        {
            if(employees[i].employeeManagerNum == manager)
            {
                empByManager[j] = employees[i];
                j++;
            }
        }
        // log         
        if(VERBOSE) console.log("data-service::getEmployeesByManager()::Employee Count: " + (j + 1)); 

        if(j > 0) resolve(empByManager);
        else reject("no results returned");
    });
}

// provide a single of "employee" object whose employeeNum property matches 
module.exports.getEmployeeByNum = (num) =>
{
    return new Promise( (resolve, reject) =>
    {
        var employeesByNum;
        for(var i = 0, j = 0; i < employees.length; i++)
        {
            if(employees[i].employeeNum == num)
            {
                employeesByNum = employees[i];
                j++;
                break;
            }
        }
        // log         
        if(VERBOSE) console.log("data-service::getEmployeeByNum()::Employee Count: " + j); 

        if(j > 0) resolve(employeesByNum);
        else reject("no results returned");
    });
}

// provide an array of "employee" objects whose isManager property is true 
module.exports.getManagers = () =>
{
    return new Promise( (resolve, reject) =>
    {
        var managers = [];
        for(var i = 0, j = 0; i < employees.length; i++)
        {
            if(employees[i].isManager)
            {
                managers[j] = employees[i];
                j++;
            }
        }
        // log         
        if(VERBOSE) console.log("data-service::getManagers()::Employee Count: " + j); 

        if(j > 0) resolve(managers);
        else reject("no results returned");
    });
}
// provide the full array of "department"
module.exports.getDepartments = () =>
{
    return new Promise( (resolve, reject) =>
    {
        // log         
        if(VERBOSE) console.log("data-service::getDepartments()::Department Count: " + departments.length); 

        if(departments.length > 0)
            resolve(departments); 
        else
            reject("no results returned");
    });
}