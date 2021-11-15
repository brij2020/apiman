const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const { getDatabase } = require("../../db/mongo");

const validate = (req, res, next) => {
    const { email, password, name, type } = req.body;

    if (email && password && name) {
        next();
    } else {
        res.status(400).json({ status: false, message: "Bad request " });
    }
};
router.post("/user/new", validate, async (req, res) => {
    try {
        const db = await getDatabase();
        const { email, password, name, type } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await db.collection("users").findOne({ email: email });
        if (!user) {
            db.collection("users")
                .insertOne({
                    name: name,
                    email: email,
                    password: encryptedPassword,
                    type: type

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
            
            return res.status(200).json({ message: "user already exist", status: false });
        }
    } catch (e) {
        res.status(500).json({ message: "please try again later!", status: false, e: e });
    }
});
module.exports = router;
