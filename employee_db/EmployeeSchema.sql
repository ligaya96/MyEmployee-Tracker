DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- creating dept tables
CREATE TABLE department (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
);
--creating roles table
CREATE TABLE  roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary  DECIMAL,
  department_id INT , 
--   FOREIGN KEY (department_id) REFERENCES department(id)
 );
-- creating employees table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(30),
  last_name  VARCHAR(30) ,
  role_id  INT ,
  manager_id  INT,
  --  FOREIGN KEY (role_id) REFERENCES roles(id),
  --  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

