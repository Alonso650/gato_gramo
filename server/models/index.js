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

db.users = require("./user.model.js")(sequelize, Sequelize);
db.grams = require("./gram.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);

// setting up the relationships between the grams and users
//db.users.hasMany(db.grams, {as: "gram"});
// db.grams.belongsTo(db.users, {
//     through: "user_grams",
//     foreignKey: "user_Id",
//     as: "user"
// });
// db.users.hasMany(db.grams, {
//     through: "user_grams",
//     foreignKey: "user_id",
//     otherKey: "gram_id"
// })

db.grams.belongsTo(db.users, {
    through: "user_grams",
    foreignKey: "gram_id",
    otherKey: "user_id"

})

db.refreshToken.belongsTo(db.users, {
    foreignKey: 'user_id', targetKey: 'user_id'
});

db.users.hasOne(db.refreshToken, {
    foreignKey: 'user_id', targetKey: 'user_id'
});

module.exports = db;
