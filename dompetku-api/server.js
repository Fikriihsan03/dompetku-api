const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fimarasa01",
  database: "dompetkuDB",
});
//SQL query to create income_log table
// CREATE TABLE income_log (id MEDIUMINT NOT NULL AUTO_INCREMENT,total_income VARCHAR(100) DEFAULT "Rp.0",date DATE,PRIMARY KEY (id));

//SQL query to create spending_log table
//CREATE TABLE spending_log (      id MEDIUMINT NOT NULL AUTO_INCREMENT, date DATE,  total_spendings VARCHAR(100) DEFAULT "Rp.0",   item_name VARCHAR(100) NOT NULL ,total_items VARCHAR(100) NOT NULL      PRIMARY KEY (id)      );

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//controllers start
app.get("/income_log", (req, res) => {
  let getIncomeLog =
    'SELECT id,total_income,DATE_FORMAT(date, "%d %M %Y") AS income_date FROM income_log ORDER BY date ASC;';
  db.query(getIncomeLog, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.post("/income_log", (req, res) => {
  const { date, total_income } = req.body;
  let postIncomeLog = `INSERT INTO income_log SET total_income = '${total_income}', date = '${date}';`;

  db.query(postIncomeLog, function (error, result) {
    if (error) throw error;
    res.status(200).json("post spending data success");
  });
});

app.get("/spending_log", (req, res) => {
  let getSpendingLog =
    'SELECT id,DATE_FORMAT(date, "%d %M %Y") AS spending_date,item_name,total_items,total_spendings FROM spending_log ORDER BY date ASC;';
  db.query(getSpendingLog, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.post("/spending_log", (req, res) => {
  const { date, total_spendings, item_name, total_items } = req.body;
  let postSpendingLog = `INSERT INTO spending_log SET date = "${date}",total_spendings = "${total_spendings}",item_name = "${item_name}", total_items = "${total_items}";`;
  db.query(postSpendingLog, function (err, result) {
    if (err) throw err;
    res.status(200).json("post spending data success");
  });
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
