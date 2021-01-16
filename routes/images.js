// Router to handle requests to prefix path /images
const router = require("express").Router();
const databaseHelper = require('../database/databaseHelpers/databaseHelpers');

const bcrypt = require('bcrypt');
const saltRounds = 10;



// add a resource  (POST a resource)


// all resources (GET all resources)

router.get("/", (req, res) => {
  databaseHelper.getUserByID(1).then(result => {
  req.session.test = "Test";
  res.send(result.username);
  })

});

module.exports = router;