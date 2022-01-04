module.exports = (sequelize, Sequelize) => {
    const Gram = sequelize.define("gram", {
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        }
    });

    return Gram;
}