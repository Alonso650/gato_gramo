module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        imageUrl:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagePublicId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Images.associate = models => {
        Images.belongsTo(models.Grams, {
            foreignKey: "GramId",
            onDelete: "CASCADE",
        });
    };

    return Images;
}