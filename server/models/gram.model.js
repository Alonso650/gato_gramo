module.exports = (sequelize, DataTypes) => {
    const Gram = sequelize.define("gram", {
        gram_id:{
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        }
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