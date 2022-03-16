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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.gram = require("./gram.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
// setting up the relationships between the grams and users
db.user.hasMany(db.gram, { onDelete: 'CASCADE' }, {as: "gram",
//    foreignKey: 'userId',
//    sourceKey: "userId",
});
db.gram.belongsTo(db.user, { onDelete: 'CASCADE' }, {
    foreignKey: "userId",
    as: "user",
  //  allowNull: "false",
  //  sourceKey: "userId"
});


// db.grams.belongsTo(db.users, {
//     through: "user_grams",
//     foreignKey: "user_Id",
//     as: "user"
// });
// db.users.hasMany(db.grams, {
//     through: "user_grams",
//     foreignKey: "userId",
//     otherKey: "gramId"
// })

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});


// db.grams.belongsTo(db.user, {
//     through: "user_grams",
//     foreignKey: "userId",
//     as: "user",
//     //otherKey: "userId"

// })

// db.refreshToken.belongsTo(db.users, {
//     foreignKey: 'userId', targetKey: 'id'
// });

// db.users.hasOne(db.refreshToken, {
//     foreignKey: 'userId', targetKey: 'id'
// });

db.ROLES = ["user", "admin"];

db.sequelize.sync();
module.exports = db;
