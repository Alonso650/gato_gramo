
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user",{
        user_id:{
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return User;
};
