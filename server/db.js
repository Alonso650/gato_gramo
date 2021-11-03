import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres",
    password: "turtle650",
    host: "localhost",
    port: 5432,
    database: "gato-gramo"

});


export default pool;