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

//Routing
app.get("/", (req, res) =>{
    res.send("Welcome to api");
});

//listar todo
app.get("/listar", (req, res) =>{
    const sql = "SELECT * FROM customers";

    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if(results.length > 0){
            res.json(results);
        } else {
            res.send('Not result');
          }
    });
}) 

//consultar por id
app.get("")