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
app.get("/listar/:id", (req, res) =>{
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE id = ${id}`

    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.send('Not result');
          }
    })
});

//agregar nuevo a la lista
app.post("/add", (req, res)=>{
    const sql = "INSERT INTO customers SET ?";

    const addObj ={
        name: req.body.name,
        city: req.body.city
    };
    connection.query(sql, addObj, error => {
        if (error) throw error;
        res.send('Customer created!');
    });

});

//actualizar
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
    const sql = `UPDATE customers SET name = '${name}', city='${city}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Customer updated!');
    });
  });

  //borrar por id
  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Delete customer');
    });
  });
  