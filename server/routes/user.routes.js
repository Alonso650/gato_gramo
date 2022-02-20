const verifySignUp = require("../middleware/verifySignUp.js");

module.exports = app => {
    const users = require("../controllers/users.js");

    var router = require("express").Router();

    router.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    router.post("/refreshToken", users.refreshToken);
    // Create a new User
    router.post("/", [verifySignUp.checkDuplicateUsernameOrEmail], users.create);

    // Signin with a valid user account
    router.post("/", users.signin);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single user with Id
    router.get("/:id", users.findOne);

    // Update a single user with Id
    router.put("/:id", users.update);

    // delete a single user with Id
    router.delete("/:id", users.delete);

    // delete all users 
    router.delete("/", users.deleteAll);

    app.use('/users', router);
};