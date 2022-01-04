const db = require("../models");
const Gram = db.grams;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    // Creating the Gram
    const gram = {
        title: req.body.title,
        description: req.body.description
    };

    Gram.create(gram).
}