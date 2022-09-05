const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Grams = require("./Grams.js")(sequelize, Sequelize);
db.Comments = require("./Comments.js")(sequelize, Sequelize);
db.Users = require("./Users.js")(sequelize, Sequelize);
db.Likes = require("./Likes.js")(sequelize, Sequelize);

// Defining associations/relationships between tables 
db.Grams.hasMany(db.Comments, {onDelete: 'CASCADE' }, {
   foreignKey: "GramId",
   sourceKey: "GramId",
});

db.Users.hasMany(db.Grams, {onDelete: 'CASCADE' }, {
    foreignKey: "UserId",
    sourceKey: "UserId"
});

db.Users.hasMany(db.Likes, {onDelete: 'CASCADE'}, {
    foreignKey: "UserId",
    sourceKey: "UserId"
})

db.Grams.hasMany(db.Likes, {onDelete: 'CASCADE'}, {
    foreignKey: "GramId",
    sourceKey: "GramId"
})

 
module.exports = db;
