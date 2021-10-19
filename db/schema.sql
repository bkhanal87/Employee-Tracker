-- creating a database employee_tracker --

DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

USE employeeTracker;

-- creating three tables: department, role, and employee --

-- department table --
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NULL
);

-- role table -- 

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL(5,2) NULL,
  department_id INT NULL
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee table --
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

