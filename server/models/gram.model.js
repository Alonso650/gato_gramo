const db = require("../models");
const User = db.user;

module.exports = (sequelize, DataTypes) => {
    const Gram = sequelize.define("gram", {
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        }


        // creatorId:{
        //     type: DataTypes.INTEGER,
        // }
        // imageType:{
        //     type: DataTypes.STRING
        // },
        // imageName:{
        //     type: DataTypes.STRING
        // },
        // imageData:{
        //     type: DataTypes.BLOB('long')
        // }
        /* other data to put into model:
            - Gender
            - photo file name? maybe allow adding multiple photos
            - personality traits: list? array?
            - up for adoption? yes or no
                -if up for adoption: location? shelter?
            - type of cat?

        */
    });
    return Gram;
};