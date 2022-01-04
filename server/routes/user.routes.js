
// const { authJwt } = require("../middleware");
// const controller = require("../controllers/users");

// module.exports = function(app) {
//     app.use(function(req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.get("/api/test/all", controller.allAccess);

//     app.get(
//         "/api/test/user",
//         [authJwt.verifyToken],
//         controller.userBoard
//     );

//     app.get(
//         "/api/test/admin",
//         [authJwt.verifyToken, authJwt.isAdmin],
//         controller.adminBoard
//     );
// };

module.exports = app => {
    const users = require("../controllers/users.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

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