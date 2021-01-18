const creds = require('../creds');

const { Pool } = require('pg');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

const pool = new Pool(creds);

pool.connect((err,client, release) => {
    console.log("Pool Connected!");
    if (err) {
      console.log("error is," , err);
    }
});

module.exports = pool;