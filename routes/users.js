const router = require("express").Router();
const databaseHelper = require('../database/databaseHelpers/databaseHelpers');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/addUser", (req, res) => {
  res.render('user_registration');
})

router.post("/addUser", (req, res) => {
  
  let user_name = req.body.user_name;
  let email = req.body.input_email;
  let password = req.body.user_password;
  
  databaseHelper.addUser(user_name, email, password)
  .then(result => {
    res.send(result);
  })
});

module.exports = router;