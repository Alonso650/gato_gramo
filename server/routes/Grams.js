require('dotenv').config();
const express = require('express');
const router = express.Router()
const { Grams, Likes } = require("../models");

const { validateToken } = require("../middleware/AuthMiddleware");
const multer = require("multer");
const cloudinary = require('cloudinary');

var storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    },
});

const imageFilter = function(req, file, callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return callback(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
};


var upload = multer({ storage: storage, fileFiler: imageFilter});

cloudinary.config({
    cloud_name: 'alonso650',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



router.get('/', validateToken, async (req, res) => {
    const listOfGrams = await Grams.findAll({include: [Likes]});

    const likedGrams = await Likes.findAll({ where: { UserId: req.user.id} });
    res.json({listOfGrams: listOfGrams, likedGrams: likedGrams});
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const gram = await Grams.findByPk(id);
    res.json(gram);
})

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfGrams = await Grams.findAll({
        where: {UserId: id},
        // the include represents the joining of two tables
        include: [Likes],
    });
    res.json(listOfGrams);
})


router.post("/", upload.single('image'), validateToken, (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, async (err, result) =>{
        const gram = req.body;

        // the result.secure_url represents the location of the image
        // located in the cloudinary
        gram.image = result.secure_url;
        gram.imageId = result.public_id;
        gram.username = req.user.username;
        gram.UserId = req.user.id;
        await Grams.create(gram);
        res.json(gram);
    })   
});

router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Grams.update({title: newTitle}, {where: {id: id}});
    res.json(newTitle);

})

router.put("/gramText", validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Grams.update({ gramText: newText}, { where: { id: id}})
})

router.delete("/:gramId", validateToken, async (req, res) => {
    const gramId = req.params.gramId;
    await Grams.destroy({
        where: {
            id: gramId,
        },
    });

    res.json("Delete Gram")
});


module.exports = router;