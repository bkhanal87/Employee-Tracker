// Dependencies

// Import and require inquirer

const inquirer = require("inquirer");

// Import and require mysql2
const mysql = require("mysql2");

// Import and require console.table package

const cTable = require("console.table");
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

        })
}

function viewAllEmployees()




function viewByDepartment()



function viewByRole()

