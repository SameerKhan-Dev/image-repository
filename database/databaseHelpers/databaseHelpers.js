
const db = require('../database');


const randomFunction = function () {

  return db.query(
    `SELECT * FROM users;
  `)
  .then(result => {
    console.log("result is:", result);
      return 4;
  });
};
module.exports = {randomFunction};

