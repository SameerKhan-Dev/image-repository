

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
     WHERE id = $1;
  `, [user_id])
  .then(result => {
    return result.rows[0];
  });
}


const getUserInfoByUserName = function (username){

  return db.query(
    `SELECT * FROM users
     WHERE username = $1;
  `, [username])
  .then(result => {
    return result.rows[0];
  });

}

// to retrieve data about a resource

const getResourceData = function (resource_id) {

  return db.query(
    `SELECT * FROM images
     WHERE id = $1;
  `, [resource_id])
  .then(result => {
    return result.rows;
  });

}
// get all resources
const getAllImagesByUserId = function (user_id) {

  return db.query(
    `SELECT * FROM images 
     WHERE owner_id = $1
  `, [user_id])
  .then(result => {
    return result.rows;
  });
}

const getImageByImageId = function (image_id) {

  return db.query(
    `SELECT * FROM images 
     WHERE images.id = $1
  `, [image_id])
  .then(result => {
    return result.rows;
  });
}

// find all resources matching certain search parameters


// find all resources belonging to a certain user


// delete a resource from the repository



  // add a resource to the repository
const addImage = function (owner_id, title,filePath, description, category) {

  return db.query(
    `INSERT INTO images (owner_id, title, filePath, description, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;
  `, [owner_id, title, filePath, description, category])
  .then(result => {
    return result.rows;
  });

}

const getAllResourcesMatchingSearch = function (searchInput) {
  //searchInput = 'ball';
  return pool.query(`

  SELECT users.username, resources.*, ROUND(AVG(resource_reviews.rating),1) AS avg
  FROM resources
  JOIN users ON users.id = resources.owner_id
  JOIN resource_reviews ON resource_reviews.resource_id = resources.id
  WHERE resources.title LIKE $1
  GROUP BY resources.id, users.username
  ORDER BY created_at DESC;`, [`%${searchInput}%`])
    .then(res => {
      console.log("res is: ", res.rows);
      // console.log("res.rows is, ", res.rows);
      return res.rows;
    })
    .catch(err => console.log(err));

  };

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
// get user by email
const getUserInfoByEmail = function (email) {

  return db.query(`

      SELECT * FROM users
      WHERE email = $1`, [email])
    .then(res => {
      if (res.rows[0]) {

        return res.rows[0];

      } else {

        return null;
      }
    })
    .catch(err => console.log(err));

}



// check if the existing email already exists or not in the database

module.exports = {addImage, getImageByImageId, getAllImagesByUserId, getUserInfoByUserName, getUserInfoByEmail , getUserData, getResourceData, addUser};