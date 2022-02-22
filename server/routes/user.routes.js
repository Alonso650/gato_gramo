const verifySignUp = require("../middleware/verifySignUp.js");

module.exports = (app) => {
    const user = require("../controllers/users.js");

    var router = require("express").Router();

    router.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    router.post("/refreshToken", user.refreshToken);
    // Create a new User
    router.post("/createuser", [verifySignUp.checkDuplicateUsernameOrEmail], user.create);

    // Signin with a valid user account
    //router.post("/", users.signin);
    router.post("/login", user.signin);

    // Retrieve all Users
    router.get("/", user.findAll);

    // Retrieve a single user with Id
    router.get("/:id", user.findOne);

    // Update a single user with Id
    router.put("/edit/:id", user.update);

    // delete a single user with Id
    router.delete("/delete/:id", user.delete);

    // delete all users 
    router.delete("/", user.deleteAll);

    app.use('/user', router);
};