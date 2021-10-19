USE employeeTracker;

INSERT INTO department(name)
VALUES("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role(title,salary,department_id)
VALUES("Sales Lead", 50000, 1),("Salesperson", 38500, 2),("Lead Engineer", 160000, 3),("Software Engineer", 120000, 4),("Account Manager", 78000, 5),("Accountant", 52000, 6),("Legal Team Lead", 142000, 7), ("Lawyer", 120000, 8);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Doe", "Sales Lead" , null), ("Mike", "Chan", "Salesperson", 1),("Ashley", "Rodriguez")
