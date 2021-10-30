const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { getDatabase } = require("../../db/mongo");
const multer = require('multer');
const path = require('path');


const imageStorage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname)
    }
})
const imageUpload  = multer({
    storage: imageStorage,
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file,cb) {
        console.log("original name ", file)
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Please upload a Image"))
        }
        cb(undefined,true);
    }
})

router.post(`/media`, imageUpload.single('image'), (req, res) => {
    console.log("res", req)
    res.send(res)
},(error, req, res, next) => {
    res.send(error)
})

// router.post("/media", (req,res) => { console.log("req",req); res.jon } )
module.exports = router;