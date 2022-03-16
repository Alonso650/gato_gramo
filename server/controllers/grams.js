const db = require("../models");
const Gram = db.gram;
const User = db.user;

// Op stands for symbol operators
const Op = db.Sequelize.Op;

// SQL queries getting created onto the database

// function addToGram (user){

// }
exports.createGram = async (req, res) =>{
   try{
   // const { userId, title, description } = req.payload;
   const _gram = {
       title: req.body.title,
       description: req.body.description,
       userId: req.body.userId,
   }
   
       const gram = await Gram.create(_gram)
       /*
       const userIdFound = await User.findAll({
           where: { userId: req.params.id }
       })
       console.log("User id found: " + userIdFound);
       */
       //gram.setUser(User.dataValues.id);
       res.send(gram);
       console.log("Gram was created: " + JSON.stringify(gram));
       console.log(JSON.stringify(User));
    //   console.log(req.User);
   } catch(error){
       res.status(500).send({ message: error.message });
   }        
//console.log("hi");
};

// exports.createGram = (userId, gram) =>{
//     return Gram.create({
//         title: gram.title,
//         description: gram.description,
//         userId: userId,
//     })
//      .then((gram) => {
//          console.log("Created a gram: " + JSON.stringify(gram));
//          return gram;
//      })
//      .catch((err) => {
//          console.log("ERror: " + err);
//      })
// }


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

 exports.getAll = (req, res) => {
//exports.getAll = async (req, res) =>{
    const title = req.params.title;
    Gram.findAll({ 
        where: {
            title,
        //    user_id: user_id
        },
        include: [ 
            {model: User, as: 'user'}
        ]
    })
        // .then(data => {
        //     res.send(data);
        // })
        .then(grams =>{
            grams.map(gram => {
                const gramImage = gram.imageData.toString('base64')
                gram['imageData'] = gramImage
            });
            res.send(grams);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || "Some error occured when searching all gram posts"
            });
        });
}

exports.getOne = (req, res) =>{
    const id = req.params.id;

    Gram.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(400).send({
                    message:`Cannot find gram with id =${id}`});
                }
            })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || "Error retrieving Gram id with = "+ id });
        });
}
// exports.getOne = (id) => {
//     return Gram.findByPk(id, { include: ["user"]})
//         .then((gram) => {
//             return gram;
//         })
//         .catch((err) => {
//             console.log("Error while finding gram: ", err);
//         });
// };