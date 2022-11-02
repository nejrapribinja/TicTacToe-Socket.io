const { Pool } = require('pg');
var dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.dbport,
// user:"xuvzrdmy",
// host:"surus.db.elephantsql.com",
// database:"xuvzrdmy",
// password:"fVZ4PrdAjMvD-DVvN8ea2jdAFK8CIzoo",
// port:5432,
  max: 3, // set pool max size to 10
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000,
});


module.exports = { pool };