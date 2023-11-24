module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes",{
        
    });

    // Creating associations with Users and Grams since there
    // is a bidirectional relationship with 2 other tables
    Likes.associate = (models) => {
        Likes.belongsTo(models.Users, {
            foreignKey: "UserId",
            onDelete: "CASCADE",
        });

        Likes.belongsTo(models.Grams, {
            foreignKey: "GramId",
            onDelete: "CASCADE",
        });
    };

    return Likes;
}