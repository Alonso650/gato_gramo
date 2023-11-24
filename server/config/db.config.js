
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "turtle650",
    DB: "postgres",
    dialect: "postgres",
    //PORT: 5432,
    pool:{
        // maximum number of connection in pool
        max: 5,
        // min number of connection in pool
        min: 0,
        // max time, in milliseconds that a connection can be idle
        // before being released
        acquire: 30000,
        // max time in milliseconds that pool will try to get connection
        // before throwing error
        idle: 10000
    }
};
