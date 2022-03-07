const db = require("../models");
const User = db.users;

let middlewareObj = {};

// middlewareObj.checkGramOwnership = (req, res, next) =>{
//     if(req.isAuthenticated()){
//         User.findOne({
//             where
//         })
//     }
// }

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to perform that action");
    res.redirect("user/login");
}

const ownerShip = {
    isLoggedIn : isLoggedIn
}

module.exports = ownerShip;