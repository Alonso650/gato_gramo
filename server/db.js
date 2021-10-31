const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "turtle650",
    host: "localhost",
    port: 5432,
    database: "gato-gramo"

});

module.exports = pool;