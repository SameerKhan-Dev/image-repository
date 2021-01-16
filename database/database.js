require('dotenv').config();


// const { rows } = require('pg/lib/defaults');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";


const { Pool } = require('pg');

const pool = new Pool( {
  user: 'hello',
  password: '123',
  host:'localhost',
  database:'lightbnb'
});

const { Pool } = require('pg');
const dbParams = require('../lib/db.js');

// console.log(dbParams);

const pool = new Pool(dbParams);
pool.connect();


module.exports = pool;