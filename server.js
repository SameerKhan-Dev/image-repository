// load .env data into process.env
require('dotenv').config();

// Web server config
const database = require('./database/database');
const fileUpload = require('express-fileupload');
//const path = require('path');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
//const sass = require("node-sass-middleware");
const app = express();
//const morgan = require('morgan');
const cookieSession = require('cookie-session');

const databaseHelper = require('./database/databaseHelpers/databaseHelpers');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan('dev'));
// use m 
app.use(fileUpload());
app.use(cookieSession({
  name: 'session',
  keys: ['b6d0e7eb-8c4b-4ae4-8460-fd3a08733dcb', '1fb2d767-ffbf-41a6-98dd-86ac2da9392e']
  }));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
*/
app.use(express.static("public"));


const userRouter = require('./routes/users');
const imageRouter = require('./routes/images');

app.get("/main", (req, res) => {

  res.render('main_page');

});

app.use("/users", userRouter);
app.use("/images", imageRouter);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

