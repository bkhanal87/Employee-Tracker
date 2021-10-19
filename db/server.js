// Dependencies

// Import and require inquirer

const inquirer = require("inquirer");

// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    port: 33070,
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'secret',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);