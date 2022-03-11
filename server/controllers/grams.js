const db = require("../models");
const Gram = db.gram;
const User = db.user;

// Op stands for symbol operators
const Op = db.Sequelize.Op;

// SQL queries getting created onto the database
//exports.create = async (req, res, userId) => {
exports.createGram = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    // Creating the Gram
    const gram = {
    //    gram_id: req.body.gram_id,
        title: req.body.title,
        description: req.body.description,
     //   imageType: req.file.mimetype,
     //   imageName: req.file.originalname,
     //   imageData: req.file.buffer,
    //    userId: userId,
    };

    let user, grams;
    Gram.create(gram)
        .then(data =>{
            res.send(data);
            console.log("Created gram entry: " + JSON.stringify(gram));

        })
        .then(() => {
            return User.findOne({ where: { username: User.username }});
        })
        .then((data) => {
            user = data;
            return Gram.findAll();
        }).then((data) =>{
            grams = data;
            user.addGrams(grams);
        }).then((data) =>{
            console.log(data);
        })
        .catch(error =>{
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating the gram entry"
            });
        });
};
// exports.createGram = (userId, gram) =>{
//     return Gram.create({
//         gram_id: gram.gram_id,
//         title: gram.title,
//         description: gram.description,
//         imageType: gram.imageType,
//         imageName: gram.imageName,
//         imageData: gram.imageData,
//         userId: userId,
//     })
//      .then((gram) => {
//          console.log(" Created Gram: " + JSON.stringify(gram));
//          return gram;
//      })
//      .catch((error) => {
//          console.log("Error while creating comment: ", error);
//      });
// };



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