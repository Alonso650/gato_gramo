const verifySignUp = require("../middleware/verifySignUp.js");
const user = require("../controllers/users.js");
const authJwt = require("../middleware/authJwt.js");

var router = require("express").Router();

    
module.exports = (app) => {

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //router.post("/refreshToken", user.refreshToken);

    // Create a new User
    router.post("/signup", [
        verifySignUp.checkDuplicateUsernameOrEmail, 
        verifySignUp.checkRolesExisted
    ], 
    user.create
    // function(req, res){
    //     const _user = user.create(req.body);
    //     res.send(_user);
    // }
    );

    // Signin with a valid user account
    router.post("/login", user.signin);

    // Retrieve all Users
    router.get("/allUsers", user.findAll);

    // Retrieve a single user with Id
    //router.get("/:id", [authJwt.verifyToken], user.findOne);
    router.get("/:id", user.findOne);

    // Update a single user with Id
    router.put("/edit/:id", user.update);

    // delete a single user with Id
    router.delete("/delete/:id", user.delete);

    // delete all users 
    router.delete("/", user.deleteAll);


    router.get("/test/all", user.allAccess);

    router.get("/test/user", [authJwt.verifyToken], user.userBoard);

    router.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], user.adminBoard);

    app.use('/user', router);


};