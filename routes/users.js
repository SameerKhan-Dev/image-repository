// Router to handle requests to prefix path /users


const router = require("express").Router();
const databaseHelper = require('../database/databaseHelpers/databaseHelpers');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// On Register Page 
// add user (POST a user)
// Route: /users/addUser
// Display addUserPage
router.get("/addUser", (req, res) => {

  res.render('user_registration');

})

router.post("/addUser", (req, res) => {
  
  let user_name = req.body.user_name;
  console.log("user_name is: ", user_name);
  let email = req.body.input_email;
  console.log("user_email is: ", email);
  let password = req.body.user_password;
  console.log("user password is: ", password);
  
  databaseHelper.addUser(user_name, email, password)
  .then(result => {
  //req.session.test = "Test";
    res.send(result);
  })

});



// On Register Page 
// add user (POST a user)
// Route: /users/addUser



module.exports = router;
