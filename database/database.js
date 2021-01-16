
require('dotenv').config({path: '/vagrant/imageRepository'});
const creds = require('../creds');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

// setup pool client and connect
const { Pool } = require('pg');
// const dbParams = require('../lib/db.js');
/*
const dbConf = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME

};
*/
/*
DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=imagerep
# Uncomment and set to true for Heroku
# DB_SSL=true if heroku
DB_PORT=5432

*/

console.log("creds:",creds);

const pool = new Pool(creds);

pool.connect((err,client, release) => {
    console.log("Pool Connected!");
    if (err) {
      console.log("error is," , err);
    }
});

// 
module.exports = pool;