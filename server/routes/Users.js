const express = require('express');
const router = express.Router();
const { Users } = require('../models')
const bcrypt = require('bcrypt');

const {validateToken} = require('../middlewares/AuthMiddleware')
const {sign} = require('jsonwebtoken');


router.post("/", async (req, res) => {
    const {username, password} = req.body;


    bcrypt.hash(password, 10).then((hash) =>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json("Success");
    })
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});

    if (user) {
        bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
                return res.json({ erorr: "Wrong username or password" });
            }
            
            const accessToken = sign({username: user.username, id: user.id},"secret")
            return res.json(accessToken);
        });
    } else {
        return res.json({ error: "User does not exist" });
    }


});


router.get("/auth", validateToken, async (req, res) => {
    res.json(req.user);
});


module.exports = router;