const express = require("express");
const router = express.Router();
const Product = require("../models/AddProduct");
const { body, validationResult } = require("express-validator");

router.post(
  "/addProduct",
  [
    body("price").isInt({ min: 0 }).withMessage("Price cannot be less than 0"),
    body(
      "contact_number",
      " Contact number should have exactly 10 digits"
    ).isLength({ min: 10, max: 10 }),
    body("expiry_date")
      .isAfter(new Date().toString())
      .withMessage("Expiry date must be after today."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      Product.create({
        product_name: req.body.product_name,
        contact_number: req.body.contact_number,
        quantity: req.body.quantity,
        expiry_date: req.body.expiry_date,
        price: req.body.price,
        location: req.body.location,
        email: req.body.email,
      });
      console.log(req.body.email);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
