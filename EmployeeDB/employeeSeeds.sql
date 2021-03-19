USE employee_db

-- insert INTO Departments
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Trainer");
INSERT into department (name) VALUES ("Enviroment Services");
--INSERT INTO employee ()
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Johnny.", "Kali", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ligaya", "Herndon", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Lilly", "Mommagirl", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Huey", "Houndog", 3, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mummble", "Lovebug", 3, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Zues", "Bigguy", 3, 3);

--INSERT INTO roles ()
INSERT into role (title, salary, department_id) VALUES ( "Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Supervisor", 900000, 1);
INSERT into role (title, salary, department_id) VALUES ("Trainer", 800000, 2);
INSERT into role (title, salary, department_id) VALUES ("IT", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Sales Associate", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Janitor", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Volunteer", 30000, 3);
--updating
--UPDATE employee
--SET
--WHERE =

--delete
--DELETE FROM 

