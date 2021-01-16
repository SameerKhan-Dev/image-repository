require('dotenv').config();

// const { rows } = require('pg/lib/defaults');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

// setup pool client and connect
const { Pool } = require('pg');
// const dbParams = require('../lib/db.js');

const pool = new Pool( {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
pool.connect((err,client, release) => {
    console.log("Pool Connected!") 
});

// 
module.exports = pool;