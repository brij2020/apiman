const express = require('express');
const router = express.Router();
const validate = (req,res,next) => {
    next();
} 
router.post(`/products`, validate, ( req,res) => {
    res.json({Js:`api done!`})
})

module.exports = router;
