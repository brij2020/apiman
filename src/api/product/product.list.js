const express = require('express');
const router = express.Router();
const { getDatabase } = require("../../db/mongo");

router.get('/lists', async (req, res) => {
    const db = await getDatabase();
    try {
        const data = await db.collection("products").find().toArray();
        if(Array.isArray(data)) {
            res.status(200).json({
                message: "data fetched sucseccfully",
                data: data,
                status: true
            })
        } else {
            res.status(400).json({
                message: "no data found",
                data: [],
                status: false
            })
        }
    } catch(e) {
        res.status(500).json({
            message: "server error",
            status: false
        })
    }
});
module.exports = router;