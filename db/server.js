// Dependencies

// Import and require inquirer

const inquirer = require("inquirer");

// Import and require mysql2
const mysql = require("mysql2");

// Import and require console.table package

const cTable = require("console.table");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const { type } = require("os");
const { table } = require("console");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '@9803656593Bk',
    database: 'employeeTracker'
  },
  console.log(`Connected to the employeeTracker database.`)
);

// Functionalities here

function start(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: ["View", "Add", "Update", "Quit"]
            }
        ]).then (function(res){
            switch(res.start){
                case "View":
                    view();
                    break;
                case "Add":
                    add();
                    break;
                case "Update":
                    updateEmployee();
                    break;
                case "Quit":
                    console.log("--------------------------");
                    console.log("All done");
                    console.log("--------------------------");
                    break;
                default:
                    console.log("default");
            }
        });
}

function view(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "view",
                message: "Select one to view:",
                choices: ["All employees", "By department", "By role"]
            }
        ]).then(function(res){
            switch(res.view){
                case "All employees":
                    viewAllEmployees();
                    break;
                case "By department":
                    viewByDepartment();
                    break;
                case "By role":
                    viewByRole();
                default:
                    console.log("default");
            }

        });
}

function viewAllEmployees(){
    connection.query("SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id", function(err, results){
        if(err) throw err;
        console.table(results);
        start();

    });
}


function viewByDepartment(){
    //query database for all departments
    connection.query("SELECT* FROM department", function(err,results){
        if(err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function(){
                        let choiceArr = [];
                        for(i=0; i< results.length; i++){
                            choiceArr.push(results[i].name);
                        }
                        return choiceArr;
                    },
                    message: "Select department"
                }
            ]).then(function(answer){
                connection.query(
                    "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id where d.name =?", [answer.choice], function(err,results)
                    {
                        if (err) throw err;
                        console.table(results);
                        start();
                    }

                )
            });

    });
}

function viewByRole(){
    //query database for all departments
    connection.query("SELECT* FROM role", function(err,results){
        if(err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function(){
                        let choiceArr = [];
                        for(i=0; i< results.length; i++){
                            choiceArr.push(results[i].title);
                        }
                        return choiceArr;
                    },
                    message: "Select role"
                }
            ]).then(function(answer){
                connection.query(
                    "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id where e.role_id =?", [answer.choice], function(err,results)
                    {
                        if (err) throw err;
                        console.table(results);
                        start();
                    }

                )
            });

    });
}

function add(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "add",
                message: "what would you like to add?",
                choices: ["Department", "Employee role", "Employee"]
            }
        ]).then(function(res){
            switch(res.add){
                case "Department":
                    addDepartment();
                    break;
                case "Employee role":
                    addEmployeeRole();
                    break;
                case "Employee":
                    addEmployee();
                    break;
                default:
                    console.log("default");

            }
        })
}

function addDepartment(){
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What would you like the department name to be?"
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO department VALUES (DEFAULT, ?)",
                [answer.department],
                function(err){
                    if(err) throw err;
                    console.log("----------------------------");
                    console.log("Departments updated with "+ answer.department);
                    console.log("----------------------------");
                }
            )
        })
}

function addEmployeeRole(){
    inquirer
        .prompt([
            {
                name:"role",
                type:"input",
                message:"Enter role title:"
            },
            {
                name: "salary",
                type: "number",
                message: "Enter salary",
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                name:"department_id",
                type:"number",
                message:"Enter department id",
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.role,
                    salary:answer.salary,
                    department_id: answer.department_id
                },
                function(err){
                    if(err) throw err;
                    console.log("-----------------------------------------");
                    console.log("Employee Roles updated with "+ answer.role);
                    console.log("-----------------------------------------");
                    start();
                }
            )
        })

}

function addEmployee(){
    connection.query("SELECT * FROM role", function(err, results){
        if(err) throw err;

        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter employee first name"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter employee last name"
                },
                {
                    name: "role",
                    type: "rawlist",
                    choices: function(){
                        let choiceArr = [];
                        for(i=0; i< results.length; i++){
                            choiceArr.push(results[i].title)
                        }
                        return choiceArr;
                    },
                    message: "Select title"
                },
                {
                    name: "manager",
                    type: "number",
                    validate: function(value){
                        if(isNaN(value) === false){
                            return true;
                        }
                        return false;
                    },
                    message: "Enter manager ID",
                    default: "1"
                }

            ]).then(function(answer){
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.role,
                        manager_id: answer.manager
                    }
                )
                console.log("-----------------------------------"),
                console.log("Employee Added Successfully!"),
                console.log("-----------------------------------");
                start()
            });
    });
}


function updateEmployee(){
    connection.query("SELECT * FROM employee",
    function(err, results){
        if(err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices:function(){
                        let choiceArr = [];
                        for(i=0; i<results.length; i++)
                        {
                            choiceArr.push(results[i].last_name);
                        }
                        return choiceArr;
                    },
                    message: "Select employee to update"
                }
            ]).then(function(answer){
                const saveName = answer.choice;

                connection.query("SELECT * FROM employee",
                function(err,results){
                    if(err) throw err;
                inquirer
                    .prompt([
                        {
                            name:"role",
                            type: "rawlist",
                            choices: function(){
                                let choiceArr = [];
                                for(i=0; i< results.length; i++){
                                    choiceArr.push(results[i].role_id)
                                }
                                return choiceArr;
                            },
                            message:"Select title"
                        },
                        {
                            name: "manager",
                            type: "number",
                            validate: function(value){
                                if(isNaN(value) === false){
                                    return true;
                                }
                                return false;
                            },
                            message: "Enter new manager ID",
                            default: "1"
                        }
                    ]).then(function(answer){
                        console.log(answer);
                        console.log(saveName);
                        connection.query("UPDATE employee SET ? WHERE last_name = ?",
                            [
                                {
                                role_id: answer.role,
                                manager_id: answer.manager
                                }, saveName
                            ],
                        ),
                        console.log("------------------------------------");
                        console.log("Employee updated!");
                        console.log("------------------------------------");
                        start();
                    });

                })
            })

    })
}

