const db = require("../models");
const Gram = db.grams;
const User = db.users;

// Op stands for symbol operators
const Op = db.Sequelize.Op;

// these are basically SQL queries getting created onto the database
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
        description: req.body.description,
        user_id: req.body.user_id
    };

    Gram.create(gram)
        .then(data =>{
            res.send(data);
        })
        .catch(error =>{
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating the gram entry"
            });
        });
};
// exports.createGram = (userId, gram) => {
//     return Gram.create({
//         gram_id: gram.gram_id,
//         title: gram.title,
//         description: gram.description,
//         userId: userId
//     })
//        .then((gram) => {
//            console.log("Created gram: " + JSON.stringify(gram));
//            return gram;
//        })
//        .catch((err) => {
//            console.log("Error while creating gram: ", err);
//        });
// };


// Update entry
exports.update = (req, res) => {
    const id = req.params.id;

    Gram.update(req.body, {
        where: {id: id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "Gram Entry was updated"
                });
            } else{
                res.send({
                    message: `Error when updating Gram id=${id}`
                });
            }
        })
        .catch(error =>{
            res.status(500).send({
                message:
                error.message || "Some error occurred while updating entry"
            });
    });
}

// delete gram entry
exports.delete = (req, res) => {
    const id = req.params.id;

    Gram.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Gram Entry was deleted"
                });
            } else {
                res.send({
                    message: `Error when destroying gram id=${id}`
                });
            }
        })
        .catch(error =>{
            res.status(500).send({
                message:
                    error.message || "Some error occurred while deleting entry"
            });
        });
}