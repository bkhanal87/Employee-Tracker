-- creating a database employee_tracker --

DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

USE employeeTracker;

-- creating three tables: department, role, and employee --

-- department table --
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

-- role table -- 

CREATE TABLE employee_role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

-- employee table --
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

