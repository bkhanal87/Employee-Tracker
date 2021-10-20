-- creating a database employee_tracker --

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- creating three tables: department, role, and employee --

-- department table --
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- role table -- 

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

-- employee table --
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id VARCHAR(30),
  manager_id INT,
  PRIMARY KEY (id)
);

