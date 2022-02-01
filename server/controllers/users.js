const db = require("../models");
const User = db.users;

//Look up what this does the Seqelize.Op
const Op = db.Sequelize.Op;

//var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and save a user
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body.username){
        return res.status(400).send({ message: "Content cannot be empty"});
    }


    // Create a User
    const user = {
        user_id: req.body.user_id,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // incrypts the password
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
            console.log("Created user: " + JSON.stringify(user));
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
      .then(user => {
          if(!user){
              return res.status(404).send({ message: "User Not Found"});
          }

          var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
          );

          if(!passwordIsValid){
              return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
              });
          }
      })
       .catch(error => {
           res.status(500).send({ message: error.message });
       })
}




// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: {[Op.iLike]: `%${username}%`}} : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.user_id;

    User.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else{
                res.status(404).send({ message: `Cannot find User with id=${id}.` });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Error retrieving User with id =" + id });
    });
};


// Update user 
exports.update = (req, res) => {
    const id = req.params.user_id;

    User.update(req.body, {
        where: {id: id}
    })
       .then(num =>{
           if(num == 1){
               res.send({ message: "User was updated" });
           } else {
               res.send({ message: `Cannot update User with id=${id}` });
           }
       })
       .catch(error => {
           res.status(500).send({ message: error.message || "Error updating User with id=" + id });
    });
}

// Delete a user 
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({ message: "User deleted succesfully" });
            } else {
                res.send({ message: "Cannot delete user" });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Could not delete user with id=" + id });
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
            res.status(500).send({ message: error.message || "Some error occurred while removing all tutorials" });
        });
};