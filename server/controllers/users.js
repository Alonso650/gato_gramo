const db = require("../models");
const User = db.users;

//Look up what this does the Seqelize.Op
const Op = db.Sequelize.Op;

// Create and save a user
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body.username){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                  error.message || "Some error occurred while creating the user"
            });
        });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: {[Op.iLike]: `%${username}%`}} : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving users"
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else{
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error retrieving User with id =" + id
            });
    });
};

// Update user 
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
       .then(num =>{
           if(num == 1){
               res.send({
                   message: "User was updated"
               });
           } else {
               res.send({
                   message: `Cannot update User with id=${id}`
               });
           }
       })
       .catch(error => {
           res.status(500).send({
               message: "Error updating User with id=" + id
           });
    });
}
// Update a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "User deleted succesfully"
                });
            } else {
                res.send({
                    message: "Cannot delete user"
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

// Delete all Users from teh datbase
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully`});
        })
        .catch(error => {
            res.status(500).send({
                message:
                   error.message || "Some error occurred while removing all tutorials"
            });
        });
};