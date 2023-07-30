const express = require("express");
const router = express.Router();
const Orders = require("../models/AddProduct");

router.post("/myProducts", async (req, res) => {
  try {
    // console.log(req.body.email);
    let data = await Orders.find({ email: req.body.email });
    res.json({ myProducts: data });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
