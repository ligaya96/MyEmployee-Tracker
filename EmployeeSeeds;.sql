DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
 --id- INT PRIMARY KEY
  --name- VARCHAR(30) to hold department name
  --PRIMARY KEY (id)
);

CREATE TABLE  roles(
  --id*- INT PRIMARY KEY
  --title -  VARCHAR(30) to hold role title
  --salary*-  DECIMAL to hold role salary
 --department_id -  INT to hold reference to department role belongs to
  PRIMARY KEY (id)
);
CREATE TABLE employee(
  --id- INT PRIMARY KEY
 --first_name - VARCHAR(30) to hold employee first name
  --last_name - VARCHAR(30) to hold employee last name
 -- role_id - INT to hold reference to role employee has
  --manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  PRIMARY KEY (id)
);


-- Insert--
--INSERT INTO employee ()
--VALUES ("");

--INSERT INTO roles ()
--VALUES ();


--updating
--UPDATE employee
--SET has_pet = true, pet_name = "Franklin", pet_age = 2
--WHERE id = 4;

--delete
--DELETE FROM 

