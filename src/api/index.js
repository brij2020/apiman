
const express = require('express');
const router = express.Router();
const { startDatabase, getDatabase } = require("../db/mongo");

const multer = require('multer');
const path = require('path');
const validate = (req,res,next) => {
    const { query:{ id } } = req;
    if(typeof id === `undefined` | id === ``) {
        res.status(400).json({error:true,ms:`please provide js id`})
    }
    next();
}

console.log("test")
router.get(`/`, async (req,res) => {
    const db = await getDatabase();
   const data = await db.collection("products").find().toArray();
    console.log("hello, world ",data);

    res.json({Js:`api done1!`})
})
router.use(`/auth`, require("./user/newUser"));
router.use(`/auth`, require("./user/login"));
router.use(`/products`, require("./product/product.list"));
router.use(`/products`, require("./product/addproduct"));
router.use(`/products`, require("./product/update.product"));
router.use(`/products`, require("./product/removeProducts"));

router.use(`/appointments`, require("./appointment/appointments"));
router.use(`/category`, require("./category"));



router.use(`/upload`, require("./media"));




module.exports = router;