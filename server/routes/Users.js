const express = require('express');
const router = express.Router();
const { Users } = require('../models')
const bcrypt = require('bcrypt');

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
            
            return res.json("Login successful");
        });
    } else {
        return res.json({ error: "User does not exist" });
    }


});


module.exports = router;