module.exports = app => {
    const grams = require("../controllers/grams.js");

    var router = require("express").Router();

    router.post("/", grams.create);

    router.get("/:id", grams.getOne);

    router.getAll("/", grams.getAll);

    router.update("/:id", grams.update);

    router.delete("/:id", grams.delete);
    
    router.delelteAll("/", grams.deleteAll);

    app.use('/grams', router);
};