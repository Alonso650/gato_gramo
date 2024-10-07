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
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        // adding adoption info
        isAdopt:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        infoGender:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        infoBreed:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        infoHairPattern:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        infoCoatLength:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        isStray:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
         // split up the location 
        isFromShelter:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        adoptInfoStreet:{
            type: DataTypes.STRING,
            allowNull: true,
        },
         adoptInfoCity:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        adoptInfoState:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        adoptInfoZipcode:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    
    return Grams;
};