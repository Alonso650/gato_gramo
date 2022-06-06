const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware")
const { checkDuplicateUsernameOrEmail } = require("../middleware/AuthMiddleware")

const { sign } = require("jsonwebtoken");

router.post("/", checkDuplicateUsernameOrEmail, async(req, res) => {
    // Making this request in this matter because
    // we want to make changes to the password
    // so we destructure it
    const { username, password, firstName, lastName, email } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hash,
        })
        res.json("SUCCESS");
    });
});

router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: {username: username}});

    if(!user) res.json({error: "User doesn't exist"});

    if(user){
        bcrypt.compare(password, user.password).then((match) => {
            if(!match){
                res.json({ error: "Wrong username and password combo "});
            }
            const accessToken = sign(
                {username: user.username, id: user.id }, 
                "penguinosecret"
            );
            // returning the accessToken so we can store it locally
            res.json({token: accessToken, username: username, id: user.id});
        })
    }

})

// this route is to check if the user is valid or not
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});


router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ['password']},
    });
    res.json(basicInfo);
})

router.put('/changepassword', validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({ where: { username: req.user.username }});

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if(!match){
            res.json({ error: "Wrong Password Entered"});
        }
        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {
                where:{ username: req.user.username}
            })
            res.json("Success");
        });
    });

});


module.exports = router;