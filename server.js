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
            "Update Employee",
            "Quit"
        ]

    }])
    .then((answers) =>{
        switch(answers.choice){
            case "Add Employee":
                return addEmployee();
            
            case "Add Role":
                return addRole(); 

             case "Add Department":
               return addDepartment();
            
             case "View all employees":
                return viewEmployees();   
                
             case "View employees by Roles":
                return viewRoles(); 
                
             case "View employees by Department":
                return viewDepartments();  
        
             case "Update Employee":
                return updateEmployee();   

            case "QUIT":
              return quit();    
          
        }
    })
};
// Query for Manager
const managerQ = [];

function getManagerInfo(){
    connection.query = ("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", (err,res)=>{
        if (err) throw (err);
        for (i=0;i<res.length;i++){
            managerQ.push(res[i].first_name);
        }
    })
    return managerQ;
};

// Query for the roles
const EmployeeRole= [];

function getRoles(){
    connection.query = ("SELECT * FROM role", (err,res)=>{
        if (err) throw (err);
        for (i=0;i<res.length;i++){
            EmployeeRole.push(res[i].title);
        }
    })
    return EmployeeRole;
};
// view Employees
function viewEmployees(){
    connection.query = ("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ', e.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;",
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        createRoster();
    })
};
// View of the Roles
function viewRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        createRoster();
    });
};
// view of the Dept
function viewDepartments(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
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
    connection.query("SELECT role.title AS title, role.salary AS salary FROM role, role.department_id AS department_id", (err,res)=>{
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
        {
          type: "list",
          name: "department_id",
          message: "Which department?",
          choices: [
              "Janitor",
              "Manager",
              "Supervisor",
              "Trainer",
              "IT",
              "Sales Associate",
              "Volunteer"
          ]
         },
        ]).then((res)=>{
            connection.query("INSERT INTO role SET ?", {
                title: res.title,
                salary: res.salary,
                department_id :res.department_id,
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
        name: 'choice',
        type: 'list',
        message: 'What is the Managers name?',
        choices: getManagerInfo()
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
    .then((answers) => {
        const managerId = getManagerInfo().indexOf(answers.choice) + 1;
        const roleId = getRoles().indexOf(answers.role) + 1
        connection.query('INSERT INTO employee SET ?', {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: roleId,
            manager_id: managerId
        }, (error) => {
            if (error) throw error;
            console.table(answers);
            createRoster();
        });
    });
};

//updating Employee
function updateEmployee(){
    connection.query("SELECT * FROM EMPLOYEE", (err,res)=>{
        if (err) throw err;
        inquirer.prompt([{
            name: 'role',
            type: 'rawlist',
            message: "Employee's title?",
            choices: newRole()
        }])
        .then((answer)=>{
            const roleId = newRole().indexOf(answer.role) + 1;
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
