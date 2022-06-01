const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.post("/", validateToken, async (req, res) => {
    const { GramId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({ where: { GramId: GramId, UserId: UserId}});

    if(!found){
        await Likes.create({ GramId: GramId, UserId: UserId })
        res.json({liked: true});
    } else{
        await Likes.destroy({
            where: { GramId: GramId, UserId: UserId},
        });
        res.json({liked: false});
    }
});


module.exports = router;