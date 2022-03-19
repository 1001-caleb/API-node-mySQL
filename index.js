const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3050;

const app = express();
app.use(bodyparser.json());

//conexion con MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_mysql'
  });

// Checkear conexion
connection.connect(error =>{
    if (error) throw error;
    console.log("Database conected");

});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  

