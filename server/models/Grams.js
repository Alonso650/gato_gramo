// module.exports = (sequelize, DataTypes) => {
//     const Grams = sequelize.define("Grams", {
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         gramText:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         image:{
//             type: DataTypes.STRING,
//         },
//         imageId:{
//             type: DataTypes.STRING,
//         },
//         username:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         // adding adoption info
//         isAdopt:{
//             type: DataTypes.BOOLEAN,
//         },
//         // adoptInfoGender:{
//         //     type: DataTypes.STRING,
//         //     allowNull: true,
//         // },
       
//         // adoptInfoCatType:{
//         //     type: DataTypes.STRING,
//         //     allowNull: true,
//         // },
//         isStray:{
//             type: DataTypes.BOOLEAN,
//             allowNull: true,
//         },
//         //  // split up the location 
//         isFromShelter:{
//             type: DataTypes.BOOLEAN,
//             allowNull: true,
//         },
//         // isFromHome:{
//         //     type: DataTypes.BOOLEAN,
//         //     allowNull: true,
//         // },
//         adopInfoStreet:{
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//          adoptInfoCity:{
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         adoptInfoState:{
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         adoptInfoZipcode:{
//             type: DataTypes.INTEGER,
//             allowNull: true,
//         },
//     });
    
//     return Grams;
// };

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