const inquirer = require('inquirer');
const mysql = require("mysql2");
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db"
  },
  console.log("Connected"),
);

const prompt = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "options",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"
      ]
    },
  ]).then(response => {
    switch (response.options) {
      case "View All Employees":
        viewEmployees()
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Update Employee Role":
        updateEmployeeRole()
        break;
      case "View All Roles":
        viewRoles()
        break;
      case "Add Role":
        addRole()
        break;
      case "View All Departments":
        viewDepartments()
        break;
      case "Add Department":
        addDepartment()
        break;
      default:
        console.log("You have quit.")
        break;
    }
  })

  const viewEmployees = () => {
    db.query(`SELECT * FROM employee JOIN role WHERE employee.role_id = role.id:`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    })
    prompt()
  }
  const addEmployee = () => {
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?", 
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer"
        ]
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"] 
      },
    ])
  }
}

prompt();