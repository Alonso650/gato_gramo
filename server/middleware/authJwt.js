const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const { TokenExpiredError } = jwt;
const User = db.user;

const catchError = (error, res) => {
    if(error instanceof TokenExpiredError){
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!"});
    }
    return res.sendStatus(401).send({ message: "Unauthorized" });
}

// getting a token from a request and proceeds only when token is validated
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers['authorization'] ||
                  req.body.token || req.query.token;

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (error, decoded) => {
        if(error){
            //return catchError(error, res);
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
    // try{
    //     const decoded = jwt.verify(token, config.TOKEN_KEY);
    //     req.user = decoded;
    // } catch(err){
    //     return res.status(401).send("Invalid token");
    // }
    // return next();
};

isAdmin = (req, res, next) => {
    User.findByPk(req, userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;