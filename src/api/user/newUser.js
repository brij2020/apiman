const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const { getDatabase } = require("../../db/mongo");

const validate = (req, res, next) => {
    const { email, password, name, age } = req.body;

    if (email && password && name && age) {
        next();
    } else {
        res.status(400).json({ status: false, message: "Bad request " });
    }
};
router.post("/user/new", validate, async (req, res) => {
    try {
        const db = await getDatabase();
        const { email, password, name, age } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await db.collection("users").findOne({ email: email });
        if (!user) {
            db.collection("users")
                .insertOne({
                    name: name,
                    age: age,
                    email: email,
                    password: encryptedPassword
                })
                .then((resp) => {
                    
                    res.status(200).json({
                        message: "new user created ",
                        status: true,
                        data: resp,
                    });
                })
                .catch((e) => {
                    res.status(200).json({
                        message: "please try again later ",
                        status: false,
                        data: [],
                    });
                });
        } else {
            
            return res.status(409).json({ message: "user already exist", status: false });
        }
    } catch (e) {
        res.status(500).json({ message: "please try again later!", status: false, e: e });
    }
});
module.exports = router;
