USE employee_db;

INSERT INTO department(name)
VALUES("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");


INSERT INTO role(title, salary, department_id)
VALUES("Sales Lead", 100000, 1),
("Salesperson", 80000, 2),
("Lead Engineer", 150000, 3),
("Software Engineer", 120000, 4),
("Account Manager", 160000, 5),
("Accountant", 125000, 6),
("Legal Team Lead", 250000, 7), 
("Lawyer", 190000, 8);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Doe", "Sales Lead" , null),
 ("Mike", "Chan", "Salesperson", 1),
 ("Ashley", "Rodriguez", "Lead Engineer", 2),
 ("Kevin","Tupik","Software Engineer", 3),
 ("Kunal Singh","Account Manager", 4),
 ("Malia","Brown","Accountant", 5),
 ("Sarah","Lourd","Legal Team Lead", 6),
 ("Tom","Allen","Lawyer", 7);


