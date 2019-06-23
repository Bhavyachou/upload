const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'data1'
});


const query = sqlStatement =>
  new Promise((resolve, reject) => {
    db.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
  //const db1 = mysql.createConnection({
    //host     : '34.205.83.88',
    //user     : 'analytics_proto',
    //password : 'analytics_123',
    //database : 'Zolo_Centers'
  //});

  
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



const upload = multer({
  dest: "./public/uploads"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
    console.log("hi");
  }
);

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




/**
 * this method creates the basic API template for a given table name using the name as route of the api
 * @param {string} tableName
 */


const createTableBasicAPI = tableName => {
 // app.get(`/${tableName}/getcittyname`, getcityname(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
};

createTableBasicAPI("upload");
//createTableBasicAPI("Centers");
const PORT = process.env.PORT || 3000;
console.log('server running at', PORT);
app.listen(PORT);






