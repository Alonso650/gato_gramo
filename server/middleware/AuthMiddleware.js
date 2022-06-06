const {verify} = require("jsonwebtoken");
const { Users } = require("../models");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({error: "User not logged in"});

    try{
        const validToken = verify(accessToken, "penguinosecret");
        req.user = validToken;

        if(validToken){
            // move forward with the request
            return next();
        }
    } catch(err){
        return res.json({ error: err });
    }
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Checking if there is a duplicate username
    Users.findOne({
        where:{
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Failed Username is taken!"
            });
            return;
        }

        // Checking if there is a duplicate email
        Users.findOne({
            where:{
                email: req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message: "Failed Email already used!"
                });
                return;
            }

            next();
        });
    });
}; 

module.exports = {validateToken, checkDuplicateUsernameOrEmail};