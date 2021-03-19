const mysql = require('mysql');
const inquirer = require('inquirer');
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
    console.log(`connected as id ${connection.threadId}\n`);
    createRoster();
  });
  