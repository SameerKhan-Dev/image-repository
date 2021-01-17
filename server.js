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
const { getUserInfoByEmail } = require('./database/databaseHelpers/databaseHelpers');

app.get("/main", (req, res) => {

  res.render('main_page');

});
app.get("/login", (req, res) => {

  req.session.user_id =  null;
  res.render('login');

});
app.post("/login", (req, res) => {
  // extract submitted login details
  let email = req.body.email;
  let password = req.body.password;
  
  // check if submitted email and username matches inside database
  databaseHelper.getUserInfoByEmail(email)
  .then (result => {
    if(result) {
      if (result.password === password) {
        req.session.user_id = result.id;
        res.redirect("/images/myImages");
        //res.redirect("/users/myImagesList");
      }
    } else {
      res.send("email or password is invalid.");
    }

  });
});
  app.get("/logout", (req,res) => {

    // clear cookies
    req.session.user_id = null;
    
    //redirect
    res.redirect("/main");
  });

  app.get("/register", (req, res) => {
    // clear cookies
    req.session.user_id = null;
    // res.redirect to login page
    res.render("register");
  });

  app.post("/register", (req, res) => {

    // extract submitted login details
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    // check that user_name is unique, if it is not then send an alert message
    
    databaseHelper.getUserInfoByUserName(username)
    .then(result => {
      if (result){
        res.send ('<script>alert("User Name is already in use.Please select a different user_name.")</script>')
       
      } else {
        databaseHelper.addUser(username, email, password)
        . then (result => {
          console.log("added user");
          res.redirect("/login");

        });        // add new user into database
      }
    });

  // if user_name is unique post to the database users tables.

  // if match is found, then log user into site

  // if not match is found, then res.send error message, or maybe create a permission denied web-page.

});

app.use("/users", userRouter);
app.use("/images", imageRouter);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

