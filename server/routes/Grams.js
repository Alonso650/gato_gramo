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
    // const listOfGrams = await Grams.findAll({include: [Likes]});
    try{
        const listOfGrams = await Grams.findAll({
            include: [
                { model: Likes},
                //{ model: Images, order: [['createdAt', 'ASC']]} // Include associated images for each gram
                { model: Images},
            ]
        });
    
        const likedGrams = await Likes.findAll({ where: { UserId: req.user.id} });
        //const imageGrams = await Images.findAll({ where: { GramId: req.gram.id} });

        res.json({
            listOfGrams: listOfGrams,
            likedGrams: likedGrams,
            //imageGrams: imageGrams,
        });
    } catch (error){
        console.error("Error fetching grams data: ", error);
        res.status(500).json({ error: "Failed to retrieve grams data." });
    }
    

    // added code for images 
    //res.json({listOfGrams: listOfGrams, likedGrams: likedGrams});
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

// router to get the images based on gramId
router.get("/getImages/:gramId", async (req, res) => {
    const gramId = req.params.gramId
    const images = await Images.findAll({
        where: {GramId: gramId}
    });
    res.json(images);
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

/*
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
*/

// need to test if this works or not
// also, thinking that with the req im retrieving the whole gram Id
// maybe I can gather the info from req.body to be able to update each piece of info individually
// but then how would i do the image? maybe reference the id to go to the image table 
// router.put("/editGram/:gramId", validateToken, upload.array('image', 5), async (req, res) => {
router.put('/editGram/:gramId', upload.array('image', 5), async (req, res) => {
    try{
        const gramId = req.params.gramId;


        const foundGram = await Grams.findByPk(gramId);
        if(!foundGram){
            return res.status(404).json({ error: "Gram not found"});
        } else {
            console.log("GRAM FOUND")
        }
        //console.log(res.json({ foundGram }))j
        console.log(foundGram);
        console.log(foundGram.title);
        console.log(req.body);

       // const [updatedRows] = await Grams.update({
        const updatedGram = await Grams.update({
            title: req.body.title,
            gramText: req.body.gramText,
            isAdopt: req.body.isAdopt,
            infoGender: req.body.infoGender,
            infoBreed: req.body.infoBreed,
            infoHairPattern: req.body.infoHairPattern,
            infoCoatLength: req.body.infoCoatLength,
            isStray: req.body.isStray,
            isFromShelter: req.body.isFromShelter,
            adoptInfoStreet: req.body.adoptInfoStreet,
            adoptInfoCity: req.body.adoptInfoCity,
            adoptInfoState: req.body.adoptInfoState,
            adoptInfoZipcode: req.body.adoptInfoZipcode,
        },
        {
            where:{ id: gramId},
        }
        );


        // if(updatedRows === 0){
        //     return res.status(404).json({ error: "Update Failed or No Changes were made"});
        // }
        if(updatedGram === null){
            return res.status(404).json({ error: "Update Failed or No Changes we're made"});
        }

        // const updatedGram = await Grams.findOne({ where: { GramId: gramId}});
        res.json({ message: "Gram updated successfully ", updatedGram });
    } catch (error){
        console.error("Error updating gram: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
    
    
    


// router.put("/editGram/:gramId", validateToken, upload.array('image', 5), async (req, res) => {
//     //const gramId = req.params.gramId;

//     Grams.findOne({ gramId: req.params.gramId}, async function(err, gram) {
//         // need to figure out how to destroy all images associated with the gram
//         // then from there i can upload new images to the cloudinary as an edit
//         // and the rest should be similar to the post
//         // i am also referencing my booklink project
//         imageList = [];
//         if(err){
//             req.flash("error", err.message);
//         } else {
//             if(req.files){
//                 try{
//                     for(const file of req.files){
//                         const result = cloudinary.v2.uploader.
//                         //await cloudinary.v2.uploader.destroy_resources(gram.imagePublicId);
//                     }
//                 }
//             }
//         }
//     })
// })

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