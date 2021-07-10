//left off at 9.3.6
const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");

router.post("/create", async (req, res) => {
    let {email, password} = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password
        });
        res.status(201).json({
            message: "User is created",
            user: User
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({message: "An account for this email already exists",});
        } else { 
        res.status(500).json({message: "Failed to create user",});
        }
    }
}); 

router.post("/login", async (req, res) => {
    let {email, password} = req.body.user;
    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        res.status(200).json({
            user: loginUser,
            message: "User is logged in"
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        })
    }
});

module.exports = router;