const express = require('express');
const router = express.Router();
const { getDatabase } = require("../../db/mongo");

router.get('/lists', async (req, res) => {
    const db = await getDatabase();
    try {
        const data = await db.collection("products").find().toArray();
        if(Array.isArray(data)) {
            res.status(200).json({
                data: data,
                status: true,
                message: "data fetched sucseccfully"
            })
        } else {
            res.status(200).json({
                data: [],
                status: false,
                message: "no data found"
            })
        }
    } catch(e) {
        res.status(500).json({
            status: false,
            message: "server error"
        })
    }
});
module.exports = router;