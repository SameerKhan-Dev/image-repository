// Router to handle requests to prefix path /users


const router = require("express").Router();
const databaseHelper = require('../database/databaseHelpers/databaseHelpers');

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get("/", (req, res) => {
  databaseHelper.getUserByID(1).then(result => {
  req.session.test = "Test";
  res.send(result.username);
  })

});

module.exports = router;
