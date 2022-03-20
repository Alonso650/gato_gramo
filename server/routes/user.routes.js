const verifySignUp = require("../middleware/verifySignUp.js");
const user = require("../controllers/users.js");
const authJwt = require("../middleware/authJwt.js");

var router = require("express").Router();

    
module.exports = (app) => {

    // Create a new User
    router.post("/signup", [
        verifySignUp.checkDuplicateUsernameOrEmail, 
        verifySignUp.checkRolesExisted
    ], 
    user.create
    );

    // Signin with a valid user account 
    router.post("/login", user.signin);

    // Retrieve all Users
    router.get("/allUsers", user.findAll);

    // Retrieve a single user with Id
    router.get("/:id", authJwt.verifyToken, user.findOne);

    router.get("/auth", authJwt.verifyToken, (req, res) => {
        res.json(req.user);
    })

    // Update a single user with Id
    router.put("/edit/:id", user.update);

    // delete a single user with Id
    router.delete("/delete/:id", user.delete);

    // delete all users 
    router.delete("/", user.deleteAll);

    app.use('/user', router);


};