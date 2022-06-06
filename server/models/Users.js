module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
};