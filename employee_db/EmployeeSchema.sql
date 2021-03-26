Drop database IF EXISTS employee_db;

Create DATABASE employee_db;
 
USE employee_db;
 
-- creating dept tables
CREATE TABLE department(
 id INT AUTO_INCREMENT NOT NULL,
 name VARCHAR(30),
 PRIMARY KEY(id)
);
-- creating roles table
CREATE TABLE  roles(
  id INT AUTO_INCREMENT NOT NULL ,
  title VARCHAR(30),
  salary  DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
 FOREIGN KEY (department_id) REFERENCES department(id)
);
-- creating employees table
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(30),
  last_name  VARCHAR(30) ,
  role_id  INT NOT NULL ,
  manager_id  INT
 -- FOREIGN KEY (role_id) REFERENCES role(id),
--  FOREIGN KEY (manager_id) REFERENCES role(id)
);