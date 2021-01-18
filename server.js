// Web server config
const database = require('./database/database');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieSession = require('cookie-session');

const databaseHelper = require('./database/databaseHelpers/databaseHelpers');

app.use(fileUpload());
app.use(cookieSession({
  name: 'session',
  keys: ['b6d0e7eb-8c4b-4ae4-8460-fd3a08733dcb', '1fb2d767-ffbf-41a6-98dd-86ac2da9392e']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const userRouter = require('./routes/users');
const imageRouter = require('./routes/images');
const { getUserInfoByEmail } = require('./database/databaseHelpers/databaseHelpers');

app.get(["/", "/main"], (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/images/myImages");
  }
  res.render('main_page');
});

app.get("/login", (req, res) => {
  req.session.user_id = null;
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
        databaseHelper.addUser(username, email, password).then(result => {
          res.redirect("/login");
        });
      }
    });
});

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
