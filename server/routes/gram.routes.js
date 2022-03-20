const grams = require("../controllers/grams.js");
const authJwt = require("../middleware/authJwt.js");
const db = require("../models");
const Gram = db.gram;
var router = require("express").Router();


module.exports = app => {

    router.post("/", authJwt.verifyToken, grams.createGram);

   // router.get("/:id", grams.getOne);
   router.get("/byId/:id", grams.getOne);

   router.get("/byuserId/:id",grams.getUserId);


   // Retrieves all grams stored in the database
   // created by all users
    router.get("/", authJwt.verifyToken, grams.getAll);
 

    router.put("/:id", grams.update);

    router.delete("/:id", grams.delete);
    
    //router.delete("/", grams.deleteAll);

    app.use('/grams', router);
};