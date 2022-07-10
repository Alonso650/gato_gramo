module.exports = (sequelize, DataTypes) => {
    const Grams = sequelize.define("Grams", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gramText:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        // image:{
        //     type: DataTypes.STRING,
        // },
        // imageId:{
        //     type: DataTypes.STRING,
        // },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Grams;
};