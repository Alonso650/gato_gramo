const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");


// getting a token from a request and proceeds only when token is validated
verifyToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken){
        return res.json({ error: "User not logged in" });
    }

    try{
        const validToken = jwt.verify(accessToken, config.secret);
        req.user = validToken;
        if(validToken){
            return next();
        }
    } catch(err){
        return res.json({ error: err});
    }
};

const authJwt = {
    verifyToken: verifyToken,
   // isAdmin: isAdmin,
};

module.exports = authJwt;