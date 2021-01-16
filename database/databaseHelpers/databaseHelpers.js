

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
// get all resources
const getAllResources = function () {

  return db.query(
    `SELECT * FROM images;
  `)
  .then(result => {
    return result.rows;
  });
}

// find all resources matching certain search parameters


// find all resources belonging to a certain user


// delete a resource from the repository



  // add a resource to the repository
const addResource = function (owner_id, title,filePath, description) {

  return db.query(
    `INSERT INTO images (owner_id, title, filePath, description)
     VALUES (${owner_id}, '${title}', '${filePath}', '${description}')
     RETURNING *;
  `)
  .then(result => {
    return result.rows;
  });

}

// add a user to the database

const addUser = function (user_name, email, password) {

  return db.query(
    `INSERT INTO users (username, email, password)
     VALUES ('${user_name}','${email}', '${password}')
     RETURNING *;
  `)
  .then(result => {
    return result.rows;
  });

}


// check if the existing email already exists or not in the database

module.exports = {getAllResources, getUserData, getResourceData, addUser, addResource};