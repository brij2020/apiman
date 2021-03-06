const express = require("express");
const router = express.Router();
const { getDatabase } = require("../../db/mongo");

const validate = (req,res,next) => {
  const {fullname, email, mobileNmb, schedule, disorder,msg } = req.body;
  if(fullname && email && mobileNmb && disorder && schedule && msg) {
    next()
  } else {
    res.status(400).json({status: false, message: "bad request" })
  }
}
router.post("/new", validate, async (req, res) => {
  const db = await getDatabase();
  const {fullname, email, mobileNmb, schedule, disorder,msg } = req.body;

  try {
    let resp = await db
      .collection("appointments")
      .findOne(
        {
       $and: [
            { 'email' : email },
            { 'mobileNmb': mobileNmb}
          ]
        }
        );
    if (!resp) {
      const { insertedId } = await db.collection("appointments").insertOne({
        ...req.body
      });

      res.status(200).json({
        data: {
          _id: insertedId,
          ...req.body
        },
        status: true,
        message: "data inserted"
      });
    } else {
      res.status(200).json({
        message: "data already exist.",
        data: [],
      });
    }
  } catch (e) {
    console.log("error",e);
    res.status(500).json({
      message: "server error",
      error: e,
    });
  }
});
module.exports = router;
