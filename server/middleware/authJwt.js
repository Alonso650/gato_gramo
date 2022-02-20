const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const { TokenExpiredError } = jwt;
const User = db.users;

const catchError = (error, res) => {
    if(error instanceof TokenExpiredError){
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!"});
    }
    return res.sendStatus(401).send({ message: "Unauthorized" });
}

// getting a token from a request and proceeds only when token is validated
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers['authorization'];

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (error, decoded) => {
        if(error){
            return catchError(error, res);
        }
        req.user_id = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;