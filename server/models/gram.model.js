const db = require("../models");
const User = db.user;

module.exports = (sequelize, DataTypes) => {
    const Gram = sequelize.define("gram", {
        // gram_id:{
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     type: DataTypes.INTEGER
        // },
        title:{
            type: DataTypes.STRING,
        //    allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
         //   allowNull: false,
        },
        // userId:{
        //     type: DataTypes.INTEGER,
        //     references: 'User',
        //     referencesKey: 'id'
        // }
        /* trying something new here */
        // userId:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: User,

        //         key: 'id'
        //     },
        //     //onDelete: 'CASCADE',
        // }
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

    //Gram.associate = (models) => {
        // Gram.belongsTo(User, {
        //     foreignKey: 'userId',
        // });
    //}
    return Gram;
};