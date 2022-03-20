const db = require("../models");
const Gram = db.gram;

// Op stands for symbol operators
const Op = db.Sequelize.Op;

// SQL queries getting created onto the database

exports.createGram = async (req, res) =>{
   try{
        const gram = req.body;
        gram.username = req.user.username;
        gram.userId = req.user.id;
   
        const _gram = await Gram.create(gram);
        res.send(_gram);
        console.log("Gram was created: " + JSON.stringify(gram));
   }catch(error){
        res.status(500).send({ message: error.message });
   }        
};



// Update entry
exports.update = (req, res) => {
    const id = req.params.gram_id;

    Gram.update(req.body, {
        where: {gram_id: id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "Gram Entry was updated"
                });
            } else{
                res.send({
                    message: `Error when updating Gram id=${gram_id}`
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
    const id = req.params.gram_id;

    Gram.destroy({
        where: {gram_id: id}
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

// exports.deleteAll = (req, res) => {
//     Gram.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ 
//                 message: `${nums} Grams were deleted `
//             })
//         })
// }




/* byId/:id*/
exports.getOne = async (req, res) => {
    const id = req.params.id;
    const gram = await Gram.findByPk(id);
    res.send(gram);
}


/*router.get("/") */
exports.getAll = async (req, res) => {
    const listOfGrams = await Gram.findAll();
    res.send(listOfGrams);
};


exports.getUserId = async(req, res) => {
    const id = req.params.id;
    const listOfGrams = await Gram.findAll({
        where: {userId: id},
    });
    res.send(listOfGrams);
}
