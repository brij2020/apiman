const express = require("express");
const router = express.Router();
const { getDatabase } = require("../../db/mongo");
const bcrypt = require("bcrypt");

const validate = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({ status: false, message: "Bad request " });
  }
};
router.post("/user/login", validate, async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: "login sucessfully", status: true });
    } else {
      res.status(200).json({ message: "bad credentails", status: false });
    }
  } catch (e) {
    res.status(500).json({ message: "please try again taler", status: false });
  }
});
module.exports = router;
