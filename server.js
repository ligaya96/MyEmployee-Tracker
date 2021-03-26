const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// mysql connections
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pasok253!',
    database: 'employee_db',
});

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    createRoster();
});

// creating Roster
function createRoster(){
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "View all employees",
            "View employees by Roles",
            "View employees by Department",
            "Update Employee Roles",
            "Quit"
        ]

    }])
    .then((answer) =>{
        switch(answer.choice){
            case "Add Employee":
                addEmployee();
              break;

              case "Add Role":
                 addRole(); 
             break;
             
             case "Add Department":
                addDepartment();
               break;
            
             case "View all employees":
                viewEmployees();   
               break;
                
             case "View employees by Roles":
                viewRoles(); 
                break;
                
             case "View employees by Department":
                viewDepartments(); 
               break; 
        
             case "Update Employee Roles":
               updateEmployeeRole();   
              break;

             case "QUIT":
              quit();
              break;    
          
        }
    })
};
// Query for Manager
const managerInfo = [];
function getManager(){
    connection.query = ("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err,res)=>{
        if (err) throw (err);
        for (i=0;i<res.length;i++){
            managerInfo.push(res[i].first_name);
        }
    })
    return managerInfo;
};

// Query for the roles
const EmployeeRole= [];
function getRoles(){
    connection.query = ("SELECT * FROM roles", (err,res)=>{
        if (err) throw (err);
        for (i=0;i<res.length;i++){
            EmployeeRole.push(res[i].title);
        }
    })
    return EmployeeRole;
};
// view Employees
function viewEmployees(){
    connection.query = ("SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name, CONCAT(e.first_name, ' ', e.last_name) AS manager FROM employee INNER JOIN roles ON roles.id = employee.role_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employee e ON employee.manager_id = e.id;",
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        createRoster();
    })
};
// View of the Roles
function viewRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, roles.title AS title FROM employee JOIN roles ON employee.role_id = roles.id;",
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        createRoster();
    });
};
// view of the Dept
function viewDepartments(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS department FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id;",
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        createRoster();
    })
};
// Adding Depts
function addDepartment(){
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: "Name of the Dept you want to add?"
    }]).then((res)=>{
        connection.query("INSERT INTO department SET ?", {
            name: res.name
        }, (err)=>{
            if (err) throw err;
            console.table(res);
           createRoster();
        })
    })
};
//Adding roles
function addRole(){
    connection.query("SELECT roles.title AS title, roles.salary AS salary FROM roles", (err,res)=>{
        inquirer.prompt([{
            name: "title",
            type: 'input',
            message: "What is the role's title?"
        },
        {
            name: 'salary',
            type: 'input',
            message: "salary?"
         },
        ]).then((res)=>{
            connection.query("INSERT INTO roles SET ?", {
                title: res.title,
                salary: res.salary,
            }, (err)=>{
                if (err) throw err;
                console.table(res);
                createRoster();
            })
        })
    })

};
//Add Employee
function addEmployee(){
    inquirer.prompt([{
        name: 'role',
        input: 'list',
        message: 'What is the employees role?',
        choices: getRoles()
    },
    {
        name: "choice",
        type: 'rawlist',
        message: 'What is the Managers name?',
        choices: getManager()
    },
    {
       name: "firstName",
       type: "input",
     messsage: "What is the first name?"
   },
    {
       name: "lastName",
       type: "input",
       message: "Last name?"
    }])
    .then((answer) => {
        const managerId = getManager().indexOf(answer.choice) + 1;
        const roleId = getRoles().indexOf(answer.role) + 1
        connection.query('INSERT INTO employee SET ?', {
            role_id: roleId,
            manager_id: managerId,
            first_name: answer.firstName,
            last_name: answer.lastName,
        }, (error) => {
            if (error) throw error;
            console.table(answer);
            createRoster();
        });
    });
};

//updating Employee
function updateEmployeeRole(){
    connection.query("SELECT roles.title FROM employee JOIN roles ON employee.role_id = roles.id;", (err,res)=>{
        if (err) throw err;
        inquirer.prompt([{
            name: 'roles',
            type: 'rawlist',
            message: "Employee's title?",
            choices: getRoles()
        }])
        .then((answer)=>{
            const roleId = getRoles().indexOf(answer.roles) + 1;
            connection.query("UPDATE employee SET WHERE ?", {
                role_id: roleId
            }, (err)=>{
                if (err) throw err;
                console.table(answer);
                createRoster();
            })
        })
    })
};

function quit() {
    console.log("Thank you. You have finished using Employee Rooster. Have a good day")
  }
