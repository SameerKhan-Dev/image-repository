
const pool = require('../database');
const db = require('../database');
/*
const randomFunction = function () {

  return db.query(
    `SELECT * FROM users;
  `)
  .then(result => {
    console.log("result is:", result);
      return 4;
  });
};
*/

// function to retrieve data about a user

const getUserData = function (user_id) {

  return db.query(
    `SELECT * FROM users
     WHERE id = ${user_id};
  `)
  .then(result => {
    return result.rows;
  });

}

// to retrieve data about a resource

const getResourceData = function (resource_id) {

  return db.query(
    `SELECT * FROM images
     WHERE id = ${resource_id};
  `)
  .then(result => {
    return result.rows;
  });

}


// find all resources matching certain search parameters


// find all resources belonging to a certain user


// delete a resource from the repository


// add a resource to the repository


// add a user to the database


// check if the existing email already exists or not in the database

module.exports = {getUserData, getResourceData};