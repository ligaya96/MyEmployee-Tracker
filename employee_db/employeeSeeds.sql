USE employee_db;

-- INSERT DEPARTMENT --
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Trainer");
INSERT into department (name) VALUES ("Enviroment Services");
-- INSERT employee --
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Johnny.", "Kali", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ligaya", "Herndon", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Lilly", "Mommagirl", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Huey", "Houndog", 3, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mummble", "Lovebug", 3, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Zues", "Bigguy", 3, 3);

-- INSERT roles --
INSERT into roles (title, salary, department_id) VALUES ( "Manager", 100000, 1);
INSERT into roles (title, salary, department_id) VALUES ("Supervisor", 900000, 1);
INSERT into roles (title, salary, department_id) VALUES ("Trainer", 800000, 2);
INSERT into roles (title, salary, department_id) VALUES ("IT", 900000, 2);
INSERT into roles (title, salary, department_id) VALUES ("Sales Associate", 30000, 3);
INSERT into roles (title, salary, department_id) VALUES ("Janitor", 30000, 3);
INSERT into roles (title, salary, department_id) VALUES ("Volunteer", 30000, 3);

-- Select tables --
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

SELECT name, title, salary
FROM roles
INNER JOIN department ON roles.department_id = department.id;

