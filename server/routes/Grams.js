require('dotenv').config();
const express = require('express');
const router = express.Router()
const { Grams, Likes, Images } = require("../models");
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


//var upload = multer({ storage: storage, fileFiler: imageFilter});
var upload = multer({ storage: storage, fileFilter: imageFilter });

// storing the photos on cloudinary
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
// router.get('/byId/:id', async (req, res) => {
//     const id = req.params.id;
//     const gram = await Grams.findByPk(id, {
//         include: [{model: Images }] // Include associated images
//     });
//     res.json(gram);
// })

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfGrams = await Grams.findAll({
        where: {UserId: id},
        // the include represents the joining of two tables
        include: [Likes],
    });
    res.json(listOfGrams);
}) 


// Remeber to include validateToken!
// Remember to keep incrementing the ids for grams by 1 inside of Postman for testing

// router.post("/", upload.single('image'), (req, res) => {
//     cloudinary.v2.uploader.upload(req.file.path, async (err, result) =>{
//         const gram = req.body;
//         console.log(gram);
//         // the result.secure_url represents the location of the image
//         // located in the cloudinary
//         gram.image = result.secure_url;
//         gram.imageId = result.public_id;
//         //gram.username = req.user.username;
//         //gram.UserId = req.user.id;
//         gram.username = "batman";
//         gram.UserId = 1;
//         await Grams.create(gram);
//         res.json(gram);
        
//     })   
// });

// This works for backend handling multiple images now 
// Now I need to fix the front end
router.post("/", upload.array('image', 5), validateToken, async (req, res) => {
        const gram = req.body;
        gram.username = req.user.username;
        gram.UserId = req.user.id;

        // Info I need to pass to the Image table: result.secure_url, result.public_id
        // and gram.id
        // imageUrl, imagePublicId
        // GramId
        const createdGram = await Grams.create(gram);
        const imageList = [];

        for(const file of req.files){
            const result = await cloudinary.v2.uploader.upload(file.path);
                imageList.push({
                    // the result.secure_url represents the location of the image
                    // located in the cloudinary
                    imageUrl: result.secure_url,
                    imagePublicId: result.public_id,
                    GramId: createdGram.id,
                });
        }
        // Allows creating multiple image entries in the database
        await Images.bulkCreate(imageList);
        res.json({ createdGram, imageList});
        
});


router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Grams.update({title: newTitle}, {where: {id: id}});
    res.json(newTitle);

})

router.put("/gramText", validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Grams.update({ gramText: newText}, { where: { id: id}})
    res.json(newText);
})

// **Note: Include put routes for other components of the gram like location, cat type etc**

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