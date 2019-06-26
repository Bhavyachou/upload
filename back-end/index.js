const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const upload = multer({dest: "./public/uploads"});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  //const db1 = mysql.createConnection({
    //host     : '34.205.83.88',
    //user     : 'analytics_proto',
    //password : 'analytics_123',
    //database : 'Zolo_Centers'
  //});
  const db = mysql.createConnection({
    host     : '34.205.83.88',
    user     : 'analytics_proto',
    password : 'analytics_123',
    database : 'Analytics_Prototype'
  });
  
  const db1 = mysql.createConnection({
    host     : '34.205.83.88',
    user     : 'analytics_proto',
    password : 'analytics_123',
    database : 'Zolo_Centers'
  });
  
  const staticFileMiddleware = express.static("dist");

  // 1st call for unredirected requests
  app.use(staticFileMiddleware);
  
app.use(
  cors({
    origin: 'http://localhost:8080'
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");

});


//const getcityname = tableName => async (req, res) => {
  //const city = await query1( `select DISTINCT CITY, LOCALNAME from ${tableName} WHERE APPROVED = 1 `  );
  //console.log('city',city);
  //res.json(city);

//};

const query = sqlStatement =>
  new Promise((resolve, reject) => {
    db.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

  const query1 = sqlStatement =>
  new Promise((resolve, reject) => {
    db1.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
   
/**
 * this mehtod insertes a new table record filling the ID automatically meaning no need to send the ID with the request
 * @param {string} tableName
 */


const insertTableRow = tableName => async (req, res) => {
  let sqlValuesStatment = "(NULL";
  for (let column in req.body) {
    sqlValuesStatment += `, '${req.body[column]}'`;
  }
  sqlValuesStatment += ")";
  console.log("hi");
  console.log(sqlValuesStatment);
  const insertedTableRow = await query(
    `insert into ${tableName} values ${sqlValuesStatment}`
  );
  
  res.json(insertedTableRow);
};



app.post('/api/upload/', upload.single('file'), (req, res) => {
  console.log("Going inside");
  if(req.file) {
      res.json(req.file);
  }
  else throw 'error';
});
const getcityname = tableName => async (req, res) => { 
  console.log('Hey there')
  const city = await query1( `select DISTINCT CITY, LOCALNAME from ${tableName} WHERE APPROVED = 1 AND TYPE = 'PROPERTY' `  );
  console.log('city',city);
  res.json(city);
}; 
/**
 * this method creates the basic API template for a given table name using the name as route of the api
 * @param {string} tableName
 */


const createTableBasicAPI = tableName => {
 app.get(`/${tableName}/getcittyname`, getcityname(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
};

createTableBasicAPI("upload");
createTableBasicAPI("Centers");
const PORT = process.env.PORT || 3000;
console.log('server running at', PORT);
app.listen(PORT);






