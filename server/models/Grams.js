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
        image:{
            type: DataTypes.STRING,
        },
        imageId:{
            type: DataTypes.STRING,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        // adding adoption info
        isAdopt:{
            type: DataTypes.BOOLEAN,
        },
        adoptInfoGender:{
            type: DataTypes.STRING,
        },
       
        adoptInfoCatType:{
            type: DataTypes.STRING,
        },
        adoptInfoIsStray:{
            type: DataTypes.BOOLEAN,
        },
         // split up the location 
         adoptInfoCity:{
            type: DataTypes.STRING,
        },
        adoptInfoState:{
            type: DataTypes.STRING,
        },
        adoptInfoZipcode:{
            type: DataTypes.INTEGER,
        },
    });
    
    return Grams;
};