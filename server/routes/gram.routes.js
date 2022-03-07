const grams = require("../controllers/grams.js");

var router = require("express").Router();


module.exports = app => {


    

    router.post("/createGram", grams.createGram);

    router.get("/:id", grams.getOne);

    router.get("/", grams.getAll);

    router.put("/:id", grams.update);

    router.delete("/:id", grams.delete);
    
    //router.delete("/", grams.deleteAll);

    app.use('/grams', router);
};