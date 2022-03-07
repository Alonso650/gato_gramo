
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user",{
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
        // },
        // token:{
        //     type: DataTypes.STRING
        // }
    });
    return User;
};
