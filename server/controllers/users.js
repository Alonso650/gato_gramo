const db = require("../models");
const config = require("../config/auth.config");
const Gram = db.gram;
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

// Op is used for operators example like greater than
// or less than, etc.
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { ROLES } = require("../models");


// Create and save a user using async
// (async makes easier to write promises)
// router.post("/")
exports.create = async (req, res) => {
    try{
        const _user = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // incrypts the password
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email.toLowerCase(),
        };
    
        const user = await User.create(_user);
        res.send(user);
        console.log("Created user: " + JSON.stringify(user));
    } catch(err){
        res.status(500).send({ message: error.message });
    }
    
};

/*
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
      .then((user) => {
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
          var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: config.jwtExpiration
          });
          var authorities = [];
          user.getRoles().then(roles => {
              for(let i = 0; i < roles.length; i++){
                  authorities.push("ROLE_" + roles[i].name.toUpperCase());
              }
              res.status(200).send({
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  roles: authorities,
                  accessToken: token
              });
          });
          //let refreshToken = RefreshToken.createToken(user);

        //   res.status(200).send({
        //       id: user.id,
        //       username: user.username,
        //       email: user.email,
        //     //  accessToken: token,
        //     //  refreshToken: refreshToken,

        //   });

      })
       .catch(error => {
           res.status(500).send({ message: error.message });
       });
};
*/
exports.signin = async(req, res) => {
    const {username, password } = req.body;

    const user = await User.findOne({ where: { username: username }});

    if(!user) res.json({ error: "user doesn't exist" });

    bcrypt.compare(password, user.password).then(async (match) => {
        if(!match) res.json({ error: "wrong username and password combination" });

        const accessToken = jwt.sign(
            { username: user.username, id: user.id},
            config.secret
        );
        res.status(200).send({
            id: user.id,
            username: user.username,
           // email: user.email,
            //roles: authorities,
            token: accessToken
        });
        
    });
};




// get the refresh token from request token
// get the refreshToken object {id, user, token, expiryDate } from raw
// token using refreshToken model static method
// verify the token (expired or not) basing on expiryDate field
// if refresh token was expired, remove it from database and return message
// cont. using user id field of refreshToken object as paramter to generate new
// access token using jsonwebtoken library
// return { new accesstoken, refreshtoken } if everything is done
// or send error message
// exports.refreshToken = async (req, res) => {
//     const { refreshToken: requestToken } = req.body;
//     if(requestToken == null){
//         return res.status(403).JSON({ message: "Refresh Token is required!"});
//     }
//     try{
//         let refreshToken = await RefreshToken.findOne({ where: { token: requestToken }});
//         console.log(refreshToken);
//         if(!refreshToken){
//             res.status(403).JSON({ message: "Refresh token is not in database"});
//             return;
//         }
//         if(RefreshToken.verifyExpiration(refreshToken)){
//             RefreshToken.destroy({ where: { id: refreshToken.id }});

//             res.status(403).JSON({
//                 message: "Refresh token was expired. Please make a new singin request"
//             });
//             return;
//         }

//         const user = await refreshToken.getUser();
//         let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
//             expiresIn: config.jwtExpiration,
//         });
//         return res.status(200).JSON({
//             accessToken: newAccessToken,
//             refreshToken: refreshToken.token,
//         });
//     } catch (error){
//         return res.status(500).send({ message: error });
//     }
// };



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
    const id = req.params.id;
    console.log("ID: " + id)

    User.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else{
                console.log(id);
                res.status(404).send({ message: `Cannot find User with id=${id}.` });
                console.log(id);
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Error retrieving User with id =" + id });
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
