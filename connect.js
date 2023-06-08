require("dotenv").config();
var mysql = require("mysql");

const con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12624100",
  password: "eF7SNx38cl",
  database: "sql12624100",
  port: "3306",
});

con.connect((err) => {
  if (err) throw err;
  console.log("MySQL is connected");
});

module.exports = con;

